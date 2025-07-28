import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { reportId, workspaceId } = await request.json();

    // Step 1: Get Azure AD token
    const tokenResponse = await getAzureADToken();
    if (!tokenResponse.access_token) {
      throw new Error('Failed to get Azure AD token');
    }

    // Step 2: Generate embed token
    const embedToken = await generateEmbedToken(
      tokenResponse.access_token,
      reportId,
      workspaceId
    );

    // Step 3: Get report details
    const reportDetails = await getReportDetails(
      tokenResponse.access_token,
      reportId,
      workspaceId
    );

    return NextResponse.json({
      embedToken: embedToken.token,
      embedUrl: reportDetails.embedUrl,
      tokenExpiry: embedToken.expiration,
    });
  } catch (error) {
    console.error('PowerBI token generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate embed token' },
      { status: 500 }
    );
  }
}

async function getAzureADToken() {
  const config = {
    clientId: process.env.POWERBI_CLIENT_ID!,
    clientSecret: process.env.POWERBI_CLIENT_SECRET!,
    tenantId: process.env.POWERBI_TENANT_ID!,
  };

  const tokenEndpoint = `https://login.microsoftonline.com/${config.tenantId}/oauth2/v2.0/token`;

  const formData = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: config.clientId,
    client_secret: config.clientSecret,
    scope: 'https://analysis.windows.net/powerbi/api/.default',
  });

  const response = await fetch(tokenEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to get Azure AD token');
  }

  return response.json();
}

async function generateEmbedToken(
  accessToken: string,
  reportId: string,
  workspaceId: string
) {
  const url = `https://api.powerbi.com/v1.0/myorg/groups/${workspaceId}/reports/${reportId}/GenerateToken`;

  const body = {
    accessLevel: 'View',
    datasetId: '', // Optional: specify dataset if needed
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error('Failed to generate embed token');
  }

  return response.json();
}

async function getReportDetails(
  accessToken: string,
  reportId: string,
  workspaceId: string
) {
  const url = `https://api.powerbi.com/v1.0/myorg/groups/${workspaceId}/reports/${reportId}`;

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to get report details');
  }

  return response.json();
}
