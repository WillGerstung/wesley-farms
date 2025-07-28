"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Loader2, BarChart3, Settings, Shield } from "lucide-react";

interface PowerBIEmbedProps {
  embedUrl: string;
  reportId: string;
  height?: string;
  width?: string;
}

export default function PowerBIEmbed({ 
  reportId,
  height = "600px", 
  width = "100%" 
}: PowerBIEmbedProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const embedContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [reportId]);

  // This is where you would implement actual PowerBI embedding
  // For production, you need to:
  // 1. Install powerbi-client: npm install powerbi-client powerbi-client-react
  // 2. Set up Azure AD app registration
  // 3. Implement token generation endpoint
  // 4. Use the PowerBI React component or SDK

  const handleConfigure = () => {
    // Open configuration modal or redirect to setup page
    console.log("Configure PowerBI");
  };

  if (error) {
    return (
      <Card className="m-6">
        <div className="p-8 text-center">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Error Loading Report</h3>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={() => setError(null)} variant="outline">
            Try Again
          </Button>
        </div>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center" style={{ height }}>
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading report...</p>
        </div>
      </div>
    );
  }

  // Placeholder for development - replace with actual PowerBI embed
  return (
    <div ref={embedContainer} style={{ height, width }} className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="h-full flex items-center justify-center p-8">
          <Card className="max-w-2xl w-full">
            <div className="p-8 text-center space-y-6">
              <div className="inline-flex p-4 rounded-full bg-primary/10">
                <BarChart3 className="h-12 w-12 text-primary" />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-2">PowerBI Configuration Required</h3>
                <p className="text-muted-foreground mb-6">
                  To display PowerBI reports, you need to configure authentication and embed settings.
                </p>
              </div>

              <div className="space-y-4 text-left max-w-md mx-auto">
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-0.5">1</Badge>
                  <div>
                    <p className="font-medium">Azure AD App Registration</p>
                    <p className="text-sm text-muted-foreground">
                      Register your application in Azure Active Directory
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-0.5">2</Badge>
                  <div>
                    <p className="font-medium">Configure API Permissions</p>
                    <p className="text-sm text-muted-foreground">
                      Grant PowerBI service permissions to your app
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-0.5">3</Badge>
                  <div>
                    <p className="font-medium">Generate Embed Tokens</p>
                    <p className="text-sm text-muted-foreground">
                      Implement server-side token generation for secure embedding
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 pt-4">
                <Button onClick={handleConfigure}>
                  <Settings className="mr-2 h-4 w-4" />
                  Configure PowerBI
                </Button>
                <Button variant="outline" asChild>
                  <a 
                    href="https://docs.microsoft.com/en-us/power-bi/developer/embedded/embed-sample-for-customers"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Documentation
                  </a>
                </Button>
              </div>

              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4" />
                <span>PowerBI security and RLS settings are preserved</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

/*
// Example implementation with powerbi-client-react:

import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';

export default function PowerBIEmbed({ embedUrl, accessToken, reportId }) {
  const reportConfig = {
    type: 'report',
    id: reportId,
    embedUrl: embedUrl,
    accessToken: accessToken,
    tokenType: models.TokenType.Embed,
    settings: {
      panes: {
        filters: {
          expanded: false,
          visible: true
        }
      },
      background: models.BackgroundType.Transparent,
    }
  };

  const eventHandlers = new Map([
    ['loaded', function () { console.log('Report loaded'); }],
    ['rendered', function () { console.log('Report rendered'); }],
    ['error', function (event) { console.log(event.detail); }]
  ]);

  return (
    <PowerBIEmbed
      embedConfig={reportConfig}
      eventHandlers={eventHandlers}
      cssClassName="report-container"
      getEmbeddedComponent={(embeddedReport) => {
        window.report = embeddedReport;
      }}
    />
  );
}
*/
