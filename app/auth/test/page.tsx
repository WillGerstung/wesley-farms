"use client";

import { useSession } from "next-auth/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";

export default function AuthTestPage() {
  const { data: session, status } = useSession();

  const envVars = [
    {
      name: "NEXTAUTH_URL",
      value: process.env.NEXT_PUBLIC_NEXTAUTH_URL,
      required: true,
    },
    {
      name: "NEXTAUTH_SECRET",
      value: "Set (server-side only)",
      required: true,
    },
    {
      name: "AZURE_AD_CLIENT_ID",
      value: "Set (server-side only)",
      required: true,
    },
    {
      name: "AZURE_AD_CLIENT_SECRET",
      value: "Set (server-side only)",
      required: true,
    },
    {
      name: "AZURE_AD_TENANT_ID",
      value: "Set (server-side only)",
      required: true,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Authentication Test Page</h1>

      {/* Session Status */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Session Status</CardTitle>
          <CardDescription>Current authentication state</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-medium">Status:</span>
              <Badge variant={status === "authenticated" ? "default" : status === "loading" ? "secondary" : "destructive"}>
                {status}
              </Badge>
            </div>
            {session?.user && (
              <>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Name:</span>
                  <span className="text-sm text-muted-foreground">{session.user.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Email:</span>
                  <span className="text-sm text-muted-foreground">{session.user.email}</span>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Environment Variables */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Environment Variables</CardTitle>
          <CardDescription>Required configuration for authentication</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {envVars.map((env) => (
              <div key={env.name} className="flex items-center justify-between p-2 rounded-lg border">
                <code className="text-sm font-mono">{env.name}</code>
                <div className="flex items-center gap-2">
                  {env.value ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-muted-foreground">{env.value}</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-4 w-4 text-red-600" />
                      <span className="text-sm text-red-600">Not set</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Azure AD Configuration */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Azure AD Configuration Checklist</CardTitle>
          <CardDescription>Make sure these are configured in Azure Portal</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium">Redirect URI</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Add this to your Azure AD app registration:
                </p>
                <code className="block mt-2 p-2 bg-muted rounded text-xs">
                  http://localhost:3000/api/auth/callback/azure-ad
                </code>
                <p className="text-xs text-muted-foreground mt-1">
                  For production, use: https://your-domain.com/api/auth/callback/azure-ad
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium">API Permissions</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Ensure these Microsoft Graph permissions are granted:
                </p>
                <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                  <li>User.Read (Delegated)</li>
                  <li>email (Delegated)</li>
                  <li>openid (Delegated)</li>
                  <li>profile (Delegated)</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium">Supported Account Types</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Should be set to: "Accounts in this organizational directory only (Single tenant)"
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Direct Links */}
      <Card>
        <CardHeader>
          <CardTitle>Test Links</CardTitle>
          <CardDescription>Direct authentication endpoints</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <a 
              href="/api/auth/signin" 
              className="block p-3 rounded-lg border hover:bg-accent transition-colors"
            >
              <p className="font-medium">/api/auth/signin</p>
              <p className="text-sm text-muted-foreground">NextAuth sign in page</p>
            </a>
            <a 
              href="/api/auth/providers" 
              className="block p-3 rounded-lg border hover:bg-accent transition-colors"
            >
              <p className="font-medium">/api/auth/providers</p>
              <p className="text-sm text-muted-foreground">List configured providers</p>
            </a>
            <a 
              href="/api/auth/session" 
              className="block p-3 rounded-lg border hover:bg-accent transition-colors"
            >
              <p className="font-medium">/api/auth/session</p>
              <p className="text-sm text-muted-foreground">Current session data</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
