import { NextRequest, NextResponse } from 'next/server';
import { ConfidentialClientApplication } from '@azure/msal-node';

// Initialize MSAL client
const msalConfig = {
  auth: {
    clientId: process.env.POWERBI_CLIENT_ID!,
    authority: `https://login.microsoftonline.com/${process.env.POWERBI_TENANT_ID}`,
    clientSecret: process.env.POWERBI_CLIENT_SECRET!,
  },
};

const msalClient = new ConfidentialClientApplication(msalConfig);

export async function GET() {
  try {
    // Get Azure AD token
    const authResult = await msalClient.acquireTokenByClientCredential({
      scopes: ['https://analysis.windows.net/powerbi/api/.default'],
    });

    if (!authResult || !authResult.accessToken) {
      throw new Error('Failed to acquire Azure AD token');
    }

    // Get all workspaces
    const workspacesResponse = await fetch(
      'https://api.powerbi.com/v1.0/myorg/groups',
      {
        headers: {
          'Authorization': `Bearer ${authResult.accessToken}`,
        },
      }
    );

    if (!workspacesResponse.ok) {
      throw new Error(`Failed to fetch workspaces: ${workspacesResponse.status}`);
    }

    const workspacesData = await workspacesResponse.json();
    const workspaces = workspacesData.value || [];

    // Get reports for each workspace
    const workspacesWithReports = await Promise.all(
      workspaces.map(async (workspace: any) => {
        try {
          const reportsResponse = await fetch(
            `https://api.powerbi.com/v1.0/myorg/groups/${workspace.id}/reports`,
            {
              headers: {
                'Authorization': `Bearer ${authResult.accessToken}`,
              },
            }
          );

          if (!reportsResponse.ok) {
            console.error(`Failed to fetch reports for workspace ${workspace.name}`);
            return {
              ...workspace,
              reports: [],
              error: `Failed to fetch reports: ${reportsResponse.status}`
            };
          }

          const reportsData = await reportsResponse.json();
          
          return {
            id: workspace.id,
            name: workspace.name,
            type: workspace.type,
            state: workspace.state,
            isOnDedicatedCapacity: workspace.isOnDedicatedCapacity,
            reports: reportsData.value?.map((report: any) => ({
              id: report.id,
              name: report.name,
              webUrl: report.webUrl,
              embedUrl: report.embedUrl,
              datasetId: report.datasetId,
            })) || []
          };
        } catch (error) {
          console.error(`Error processing workspace ${workspace.name}:`, error);
          return {
            ...workspace,
            reports: [],
            error: error instanceof Error ? error.message : 'Unknown error'
          };
        }
      })
    );

    // Also get dashboards if needed
    const dashboardsPromises = workspaces.map(async (workspace: any) => {
      try {
        const dashboardsResponse = await fetch(
          `https://api.powerbi.com/v1.0/myorg/groups/${workspace.id}/dashboards`,
          {
            headers: {
              'Authorization': `Bearer ${authResult.accessToken}`,
            },
          }
        );

        if (!dashboardsResponse.ok) {
          return [];
        }

        const dashboardsData = await dashboardsResponse.json();
        return dashboardsData.value || [];
      } catch {
        return [];
      }
    });

    const allDashboards = await Promise.all(dashboardsPromises);

    // Summary statistics
    const totalReports = workspacesWithReports.reduce(
      (sum, ws) => sum + ws.reports.length, 
      0
    );
    const totalDashboards = allDashboards.reduce(
      (sum, dashboards) => sum + dashboards.length, 
      0
    );

    return NextResponse.json({
      summary: {
        totalWorkspaces: workspaces.length,
        totalReports,
        totalDashboards,
        workspacesWithCapacity: workspaces.filter((ws: any) => ws.isOnDedicatedCapacity).length,
      },
      workspaces: workspacesWithReports,
      raw: {
        workspaces,
      }
    });
  } catch (error) {
    console.error('Error listing PowerBI resources:', error);
    return NextResponse.json(
      { 
        error: 'Failed to list PowerBI resources',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
