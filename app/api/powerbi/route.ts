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

// Cache for tokens (in production, use Redis or similar)
const tokenCache = new Map<string, { token: string; expiry: number }>();

export async function POST(request: NextRequest) {
  try {
    const { reportId, workspaceId } = await request.json();

    if (!reportId || !workspaceId) {
      return NextResponse.json(
        { error: 'Missing reportId or workspaceId' },
        { status: 400 }
      );
    }

    // Check cache first
    const cacheKey = `${workspaceId}-${reportId}`;
    const cached = tokenCache.get(cacheKey);
    if (cached && cached.expiry > Date.now()) {
      console.log('Using cached token');
      return NextResponse.json({
        embedToken: cached.token,
        embedUrl: `https://app.powerbi.com/reportEmbed?reportId=${reportId}&groupId=${workspaceId}`,
        tokenExpiry: new Date(cached.expiry).toISOString(),
      });
    }

    console.log('Generating new token...');

    // Step 1: Get Azure AD token
    const authResult = await msalClient.acquireTokenByClientCredential({
      scopes: ['https://analysis.windows.net/powerbi/api/.default'],
    });

    if (!authResult || !authResult.accessToken) {
      throw new Error('Failed to acquire Azure AD token');
    }

    console.log('Got Azure AD token');

    // Step 2: Generate PowerBI Embed Token
    const embedTokenResponse = await fetch(
      `https://api.powerbi.com/v1.0/myorg/groups/${workspaceId}/reports/${reportId}/GenerateToken`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authResult.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accessLevel: 'View',
          allowSaveAs: false,
        }),
      }
    );

    if (!embedTokenResponse.ok) {
      const errorText = await embedTokenResponse.text();
      console.error('PowerBI API Error:', errorText);
      throw new Error(`Failed to generate embed token: ${embedTokenResponse.status}`);
    }

    const embedToken = await embedTokenResponse.json();
    console.log('Got embed token');

    // Step 3: Get Report Details (for embed URL)
    const reportResponse = await fetch(
      `https://api.powerbi.com/v1.0/myorg/groups/${workspaceId}/reports/${reportId}`,
      {
        headers: {
          'Authorization': `Bearer ${authResult.accessToken}`,
        },
      }
    );

    if (!reportResponse.ok) {
      throw new Error(`Failed to get report details: ${reportResponse.status}`);
    }

    const reportDetails = await reportResponse.json();
    console.log('Got report details');

    // Cache the token (expires in 1 hour by default)
    const expiryTime = new Date(embedToken.expiration).getTime();
    tokenCache.set(cacheKey, {
      token: embedToken.token,
      expiry: expiryTime,
    });

    // Clean up expired tokens
    for (const [key, value] of tokenCache.entries()) {
      if (value.expiry < Date.now()) {
        tokenCache.delete(key);
      }
    }

    return NextResponse.json({
      embedToken: embedToken.token,
      embedUrl: reportDetails.embedUrl,
      tokenExpiry: embedToken.expiration,
      reportName: reportDetails.name,
    });
  } catch (error) {
    console.error('PowerBI embedding error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate embed token',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// GET endpoint to test the connection
export async function GET() {
  try {
    // Test Azure AD connection
    const authResult = await msalClient.acquireTokenByClientCredential({
      scopes: ['https://analysis.windows.net/powerbi/api/.default'],
    });

    if (!authResult || !authResult.accessToken) {
      throw new Error('Failed to acquire Azure AD token');
    }

    // Test PowerBI API connection
    const workspacesResponse = await fetch(
      'https://api.powerbi.com/v1.0/myorg/groups',
      {
        headers: {
          'Authorization': `Bearer ${authResult.accessToken}`,
        },
      }
    );

    if (!workspacesResponse.ok) {
      throw new Error(`PowerBI API returned ${workspacesResponse.status}`);
    }

    const workspaces = await workspacesResponse.json();

    return NextResponse.json({
      status: 'Connected successfully',
      workspaceCount: workspaces.value?.length || 0,
      tokenAcquired: true,
    });
  } catch (error) {
    console.error('Connection test error:', error);
    return NextResponse.json(
      { 
        status: 'Connection failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
