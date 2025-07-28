"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Loader2,
  RefreshCw,
  Copy,
  CheckCircle2,
  AlertCircle,
  Database,
  BarChart3,
  Zap,
  ExternalLink,
  FileText,
  Eye,
} from "lucide-react";

export default function PowerBIExplorerPage() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchResources = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/powerbi/list');
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.details || result.error || 'Failed to fetch resources');
      }

      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load PowerBI resources');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const generateConfigSnippet = (workspace: any) => {
    const reports = workspace.reports.map((report: any) => `  {
    id: "${report.name.toLowerCase().replace(/\s+/g, '-')}",
    name: "${report.name}",
    description: "Description for ${report.name}",
    reportId: "${report.id}",
    workspaceId: "${workspace.id}",
    category: "General",
  }`).join(',\n');

    return `// Add this to your app/config/clients.ts file
reports: [
${reports}
],`;
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Loading PowerBI resources...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Error Loading Resources</h3>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={fetchResources}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold tracking-tight">PowerBI Explorer</h1>
          <Button onClick={fetchResources} variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
        <p className="text-muted-foreground">
          Browse all your accessible PowerBI workspaces and reports
        </p>
      </div>

      {/* Summary Cards */}
      {data && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Workspaces</p>
                  <p className="text-2xl font-bold">{data.summary.totalWorkspaces}</p>
                </div>
                <Database className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Reports</p>
                  <p className="text-2xl font-bold">{data.summary.totalReports}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Dashboards</p>
                  <p className="text-2xl font-bold">{data.summary.totalDashboards}</p>
                </div>
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Premium</p>
                  <p className="text-2xl font-bold">{data.summary.workspacesWithCapacity}</p>
                </div>
                <Zap className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Workspaces and Reports */}
      {data && data.workspaces.length > 0 ? (
        <Tabs defaultValue={data.workspaces[0].id} className="space-y-4">
          <TabsList className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 h-auto gap-2">
            {data.workspaces.map((workspace: any) => (
              <TabsTrigger
                key={workspace.id}
                value={workspace.id}
                className="flex items-center justify-between gap-2 h-auto p-3"
              >
                <span className="truncate">{workspace.name}</span>
                <div className="flex items-center gap-1">
                  {workspace.isOnDedicatedCapacity && (
                    <Badge variant="secondary" className="text-xs">
                      Premium
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-xs">
                    {workspace.reports.length}
                  </Badge>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>

          {data.workspaces.map((workspace: any) => (
            <TabsContent key={workspace.id} value={workspace.id}>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{workspace.name}</CardTitle>
                      <CardDescription>
                        Workspace ID: {workspace.id}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-2 h-6 px-2"
                          onClick={() => copyToClipboard(workspace.id, `ws-${workspace.id}`)}
                        >
                          {copiedId === `ws-${workspace.id}` ? (
                            <CheckCircle2 className="h-3 w-3" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </Button>
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      {workspace.isOnDedicatedCapacity && (
                        <Badge className="bg-purple-600">
                          <Zap className="mr-1 h-3 w-3" />
                          Premium Capacity
                        </Badge>
                      )}
                      <Badge variant="outline">
                        {workspace.type}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {workspace.reports.length > 0 ? (
                    <>
                      <h3 className="font-semibold mb-4">Reports ({workspace.reports.length})</h3>
                      <div className="space-y-3 mb-6">
                        {workspace.reports.map((report: any) => (
                          <div
                            key={report.id}
                            className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent transition-colors"
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <BarChart3 className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">{report.name}</span>
                              </div>
                              <div className="mt-1 text-sm text-muted-foreground">
                                Report ID: {report.id}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="ml-2 h-6 px-2"
                                  onClick={() => copyToClipboard(report.id, `report-${report.id}`)}
                                >
                                  {copiedId === `report-${report.id}` ? (
                                    <CheckCircle2 className="h-3 w-3" />
                                  ) : (
                                    <Copy className="h-3 w-3" />
                                  )}
                                </Button>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm" asChild>
                                <a
                                  href={report.webUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <ExternalLink className="mr-2 h-4 w-4" />
                                  View in PowerBI
                                </a>
                              </Button>
                              <Button
                                variant="default"
                                size="sm"
                                onClick={() => {
                                  window.location.href = `/reports?workspace=${workspace.id}&report=${report.id}`;
                                }}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                Embed
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="border-t pt-6">
                        <h4 className="font-semibold mb-3">Configuration Snippet</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Copy this configuration to your <code className="bg-muted px-1 py-0.5 rounded">app/config/clients.ts</code> file:
                        </p>
                        <div className="relative">
                          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                            <code>{generateConfigSnippet(workspace)}</code>
                          </pre>
                          <Button
                            variant="outline"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => copyToClipboard(generateConfigSnippet(workspace), `config-${workspace.id}`)}
                          >
                            {copiedId === `config-${workspace.id}` ? (
                              <CheckCircle2 className="h-4 w-4" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">
                      No reports found in this workspace
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <Database className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No Workspaces Found</h3>
            <p className="text-muted-foreground">
              Make sure your app has been granted access to PowerBI workspaces.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
