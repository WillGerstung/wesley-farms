"use client";

import { useEffect, useRef, useState } from "react";
import * as powerbi from "powerbi-client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Loader2, RefreshCw, Maximize2, CheckCircle2 } from "lucide-react";

interface PowerBIEmbedProps {
  reportId: string;
  workspaceId: string;
  height?: string;
  width?: string;
}

export default function PowerBIEmbed({ 
  reportId,
  workspaceId,
  height = "600px", 
  width = "100%" 
}: PowerBIEmbedProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [embedToken, setEmbedToken] = useState<string | null>(null);
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  const embedContainer = useRef<HTMLDivElement>(null);
  const reportRef = useRef<powerbi.Report | null>(null);

  // Fetch embed token
  const fetchEmbedToken = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/powerbi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reportId,
          workspaceId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || errorData.error || 'Failed to get embed token');
      }

      const data = await response.json();
      setEmbedToken(data.embedToken);
      setEmbedUrl(data.embedUrl);
      
      // Embed the report once we have the token
      embedReport(data.embedToken, data.embedUrl);
    } catch (err) {
      console.error('Failed to fetch embed token:', err);
      setError(err instanceof Error ? err.message : 'Failed to load report');
      setIsLoading(false);
    }
  };

  // Embed the report using PowerBI client
  const embedReport = async (token: string, url: string) => {
    if (!embedContainer.current) return;

    try {
      const powerbiService = new powerbi.service.Service(
        powerbi.factories.hpmFactory,
        powerbi.factories.wpmpFactory,
        powerbi.factories.routerFactory
      );

      const config: powerbi.IReportEmbedConfiguration = {
        type: 'report',
        tokenType: powerbi.models.TokenType.Embed,
        accessToken: token,
        embedUrl: url,
        id: reportId,
        permissions: powerbi.models.Permissions.Read,
        settings: {
          panes: {
            filters: {
              expanded: false,
              visible: true
            }
          },
          background: powerbi.models.BackgroundType.Transparent,
        }
      };

      // Clear any existing report
      powerbiService.reset(embedContainer.current);

      // Embed the report
      const report = powerbiService.embed(embedContainer.current, config);
      reportRef.current = report as powerbi.Report;

      // Handle loaded event
      report.on('loaded', function () {
        console.log('Report loaded');
        setIsLoading(false);
      });

      // Handle rendered event
      report.on('rendered', function () {
        console.log('Report rendered');
      });

      // Handle error event
      report.on('error', function (event: any) {
        console.error('Report error:', event.detail);
        setError('Failed to load report');
        setIsLoading(false);
      });

    } catch (err) {
      console.error('Failed to embed report:', err);
      setError('Failed to embed report');
      setIsLoading(false);
    }
  };

  // Refresh the report
  const refreshReport = () => {
    if (reportRef.current) {
      reportRef.current.refresh();
    } else {
      fetchEmbedToken();
    }
  };

  // Enter fullscreen
  const enterFullscreen = () => {
    if (reportRef.current) {
      reportRef.current.fullscreen();
    }
  };

  useEffect(() => {
    fetchEmbedToken();
  }, [reportId, workspaceId]);

  if (error) {
    return (
      <div className="flex items-center justify-center p-8" style={{ height }}>
        <Card className="max-w-md w-full p-6 text-center">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Error Loading Report</h3>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={fetchEmbedToken} variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="relative" style={{ width }}>
      {/* Loading overlay */}
      {isLoading && (
        <div 
          className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center"
          style={{ height }}
        >
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Loading PowerBI report...</p>
          </div>
        </div>
      )}

      {/* Report controls */}
      {!isLoading && embedToken && (
        <div className="absolute top-4 right-4 z-20 flex gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={refreshReport}
            className="shadow-md"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={enterFullscreen}
            className="shadow-md"
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* PowerBI embed container */}
      <div 
        ref={embedContainer}
        style={{ height, width }}
        className="powerbi-container"
      />

      {/* Success indicator */}
      {!isLoading && embedToken && (
        <div className="absolute bottom-4 left-4 z-20">
          <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
            <CheckCircle2 className="mr-1 h-3 w-3 text-green-600" />
            Report Connected
          </Badge>
        </div>
      )}
    </div>
  );
}
