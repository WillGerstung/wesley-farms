# PowerBI Integration Setup Guide

This guide will help you set up PowerBI embedding in the Wesley Farm Supply Data Platform while maintaining all PowerBI security settings including Row-Level Security (RLS).

## Overview

PowerBI maintains its own security model. When you embed reports:
- **Row-Level Security (RLS)** is preserved and enforced
- **Workspace permissions** are respected
- **Dataset security** remains intact
- Users only see data they're authorized to access

## Prerequisites

1. PowerBI Pro or Premium Per User license
2. Azure Active Directory access
3. PowerBI workspace with reports
4. Admin access to register Azure AD applications

## Step 1: Azure AD App Registration

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to **Azure Active Directory** > **App registrations**
3. Click **New registration**
4. Configure the application:
   ```
   Name: Wesley Farm Supply Data Platform
   Supported account types: Single tenant
   Redirect URI: https://your-domain.com/api/auth/callback
   ```
5. Save the **Application (client) ID** and **Directory (tenant) ID**

## Step 2: Configure API Permissions

1. In your app registration, go to **API permissions**
2. Click **Add a permission** > **Microsoft APIs** > **Power BI Service**
3. Select **Delegated permissions** and add:
   - `Report.Read.All`
   - `Dashboard.Read.All`
   - `Dataset.Read.All`
   - `Workspace.Read.All`
4. If using app-only auth, also add **Application permissions**:
   - `Tenant.Read.All`
   - `Report.Read.All`
5. Click **Grant admin consent**

## Step 3: Create Client Secret

1. Go to **Certificates & secrets**
2. Click **New client secret**
3. Add a description and expiry
4. Save the secret value immediately (it won't be shown again)

## Step 4: Configure PowerBI Workspace

1. Open [PowerBI Service](https://app.powerbi.com)
2. Go to your workspace settings
3. Under **Access**, add your Azure AD app as a member
4. Grant **Viewer** or **Member** role based on requirements

## Step 5: Environment Variables

Create a `.env.local` file in your project root:

```env
# PowerBI Configuration
POWERBI_CLIENT_ID=your-app-client-id
POWERBI_CLIENT_SECRET=your-client-secret
POWERBI_TENANT_ID=your-tenant-id
POWERBI_WORKSPACE_ID=your-workspace-id

# Optional: For user-specific embedding
POWERBI_USERNAME=master-user@domain.com
POWERBI_PASSWORD=master-user-password
```

## Step 6: Install Dependencies

```bash
npm install powerbi-client powerbi-client-react @azure/msal-node
```

## Step 7: Update PowerBI Embed Component

Replace the placeholder in `/components/powerbi-embed.tsx` with:

```typescript
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import { useEffect, useState } from 'react';

export default function PowerBIEmbed({ reportId, workspaceId }) {
  const [embedConfig, setEmbedConfig] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEmbedToken();
  }, [reportId]);

  const fetchEmbedToken = async () => {
    try {
      const response = await fetch('/api/powerbi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reportId, workspaceId }),
      });

      const data = await response.json();
      
      setEmbedConfig({
        type: 'report',
        id: reportId,
        embedUrl: data.embedUrl,
        accessToken: data.embedToken,
        tokenType: models.TokenType.Embed,
        settings: {
          panes: {
            filters: { visible: true, expanded: false }
          },
          background: models.BackgroundType.Transparent,
        }
      });
    } catch (err) {
      setError(err.message);
    }
  };

  if (!embedConfig) return <div>Loading...</div>;

  return (
    <PowerBIEmbed
      embedConfig={embedConfig}
      eventHandlers={eventHandlers}
      cssClassName="report-container"
    />
  );
}
```

## Security Modes

### 1. App-Only Authentication (Recommended for Internal Apps)
- Uses service principal
- No user context required
- Best for trusted environments

### 2. User-Based Authentication
- Each user authenticates individually
- Respects user's PowerBI permissions
- RLS applies based on user identity

### 3. Embed for Customers (Master User)
- Uses a master account
- Programmatically apply RLS
- Best for external-facing apps

## Row-Level Security (RLS) Implementation

### Option 1: Preserve Existing RLS
When using user-based authentication, RLS is automatically applied based on the authenticated user's identity.

### Option 2: Dynamic RLS with Embed Token
For app-only authentication, pass effective identity:

```typescript
const embedTokenRequest = {
  accessLevel: 'View',
  identities: [{
    username: 'user@domain.com',
    roles: ['Regional Manager'],
    datasets: [datasetId]
  }]
};
```

### Option 3: Custom RLS Rules
Define rules in PowerBI Desktop:
1. Modeling > Manage Roles
2. Create roles with DAX filters
3. Test with "View as Role"

## Testing Your Setup

1. **Test Token Generation**:
   ```bash
   curl -X POST http://localhost:3000/api/powerbi \
     -H "Content-Type: application/json" \
     -d '{"reportId":"your-report-id","workspaceId":"your-workspace-id"}'
   ```

2. **Verify RLS**:
   - Log in as different users
   - Confirm they see only authorized data
   - Check filter context in reports

3. **Monitor Usage**:
   - PowerBI Admin Portal > Usage metrics
   - Azure AD sign-in logs
   - Application Insights (optional)

## Troubleshooting

### Common Issues

1. **"Unauthorized" Error**
   - Verify app permissions in Azure AD
   - Check workspace access for service principal
   - Ensure admin consent is granted

2. **"Report not found"**
   - Confirm report ID and workspace ID
   - Check app has workspace access
   - Verify report is published

3. **RLS Not Working**
   - Test roles in PowerBI Desktop
   - Verify effective identity in embed token
   - Check dataset security settings

4. **Token Expiry**
   - Implement token refresh logic
   - Default expiry is 1 hour
   - Cache tokens appropriately

### Debug Mode

Enable detailed logging:
```javascript
window.powerbi.debugging = true;
```

## Best Practices

1. **Security**
   - Never expose credentials in client-side code
   - Use environment variables for sensitive data
   - Implement proper authentication middleware
   - Rotate secrets regularly

2. **Performance**
   - Cache embed tokens (respect expiry)
   - Preload reports for better UX
   - Use capacity metrics to optimize

3. **User Experience**
   - Show loading states
   - Handle errors gracefully
   - Provide refresh options
   - Implement responsive design

## Production Checklist

- [ ] Azure AD app configured with production URLs
- [ ] Environment variables set in production
- [ ] SSL certificate configured
- [ ] Error logging implemented
- [ ] Token refresh mechanism in place
- [ ] RLS tested with multiple user roles
- [ ] Performance monitoring enabled
- [ ] Backup authentication method configured

## Additional Resources

- [PowerBI Embedded Documentation](https://docs.microsoft.com/en-us/power-bi/developer/embedded/)
- [PowerBI REST APIs](https://docs.microsoft.com/en-us/rest/api/power-bi/)
- [Row-Level Security Guide](https://docs.microsoft.com/en-us/power-bi/admin/service-admin-rls)
- [Azure AD Authentication](https://docs.microsoft.com/en-us/azure/active-directory/develop/)

## Support

For issues specific to this implementation:
1. Check the troubleshooting section
2. Review Azure AD logs
3. Contact your PowerBI administrator
4. Open an issue in the project repository
