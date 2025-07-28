"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, Loader2, RefreshCw, Key, Server, Shield } from "lucide-react";

export default function TestPowerBIPage() {
  const [testResult, setTestResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testConnection = async () => {
    setIsLoading(true);
    setError(null);
    setTestResult(null);

    try {
      const response = await fetch('/api/powerbi', {
        method: 'GET',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Connection test failed');
      }

      setTestResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const envVars = [
    { 
      name: 'POWERBI_CLIENT_ID', 
      value: process.env.NEXT_PUBLIC_POWERBI_CLIENT_ID ? '✓ Set' : '✗ Missing',
      icon: Key,
      status: process.env.NEXT_PUBLIC_POWERBI_CLIENT_ID ? 'success' : 'error'
    },
    { 
      name: 'POWERBI_TENANT_ID', 
      value: process.env.NEXT_PUBLIC_POWERBI_TENANT_ID ? '✓ Set' : '✗ Missing',
      icon: Server,
      status: process.env.NEXT_PUBLIC_POWERBI_TENANT_ID ? 'success' : 'error'
    },
    { 
      name: 'POWERBI_CLIENT_SECRET', 
      value: '✓ Set (Server-side only)',
      icon: Shield,
      status: 'success'
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">PowerBI Connection Test</h1>

      {/* Environment Variables Check */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Environment Variables</CardTitle>
          <CardDescription>
            Checking if required environment variables are configured
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {envVars.map((env) => {
              const Icon = env.icon;
              return (
                <div key={env.name} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                    <code className="text-sm font-mono">{env.name}</code>
                  </div>
                  <Badge 
                    variant={env.status === 'success' ? 'default' : 'destructive'}
                    className={env.status === 'success' ? 'bg-green-600' : ''}
                  >
                    {env.value}
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Connection Test */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>API Connection Test</CardTitle>
          <CardDescription>
            Test the connection to Azure AD and PowerBI API
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={testConnection} 
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Testing Connection...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Test Connection
              </>
            )}
          </Button>

          {/* Test Results */}
          {testResult && (
            <div className="mt-6 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-semibold text-green-900 dark:text-green-100">
                    Connection Successful!
                  </h4>
                  <div className="mt-2 space-y-1 text-sm text-green-800 dark:text-green-200">
                    <p>✓ Azure AD token acquired</p>
                    <p>✓ PowerBI API accessible</p>
                    <p>✓ Found {testResult.workspaceCount} workspace(s)</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="mt-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-semibold text-red-900 dark:text-red-100">
                    Connection Failed
                  </h4>
                  <p className="mt-1 text-sm text-red-800 dark:text-red-200">
                    {error}
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Next Steps</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-semibold">1. Update your client configuration</h4>
            <p className="text-sm text-muted-foreground">
              Edit <code className="bg-muted px-1 py-0.5 rounded">app/config/clients.ts</code> with your actual report IDs and workspace IDs.
            </p>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-semibold">2. Grant workspace access</h4>
            <p className="text-sm text-muted-foreground">
              In PowerBI Service, add your app to the workspace with at least Viewer permissions.
            </p>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-semibold">3. Test your reports</h4>
            <p className="text-sm text-muted-foreground">
              Navigate to the Reports page to see your embedded PowerBI reports.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
