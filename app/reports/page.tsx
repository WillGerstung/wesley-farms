"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Download,
  Expand,
  Filter,
  RefreshCw,
  Share2,
  Clock,
  TrendingUp,
  DollarSign,
  Package,
  Users,
  FileText,
  ExternalLink,
  BarChart3,
} from "lucide-react";
import PowerBIEmbed from "@/components/powerbi-embed";

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState(0);

  const reports = [
    {
      id: "sales-dashboard",
      name: "Sales Dashboard",
      description: "Monthly sales performance and analytics",
      category: "Sales",
      lastUpdated: "2 hours ago",
      embedUrl: "https://app.powerbi.com/reportEmbed?reportId=YOUR_REPORT_ID",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      id: "inventory-report",
      name: "Inventory Report",
      description: "Current inventory levels and trends",
      category: "Operations",
      lastUpdated: "1 day ago",
      embedUrl: "https://app.powerbi.com/reportEmbed?reportId=YOUR_REPORT_ID_2",
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      id: "financial-overview",
      name: "Financial Overview",
      description: "Financial metrics and KPIs",
      category: "Finance",
      lastUpdated: "3 hours ago",
      embedUrl: "https://app.powerbi.com/reportEmbed?reportId=YOUR_REPORT_ID_3",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      id: "customer-insights",
      name: "Customer Insights",
      description: "Customer behavior and segmentation analysis",
      category: "Marketing",
      lastUpdated: "5 hours ago",
      embedUrl: "https://app.powerbi.com/reportEmbed?reportId=YOUR_REPORT_ID_4",
      icon: Users,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Reports</h1>
        <p className="text-muted-foreground">
          Access your PowerBI reports and analytics dashboards
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Report Selector Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Report List */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Available Reports</CardTitle>
              <CardDescription>Select a report to view</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1 p-2">
                {reports.map((report, index) => {
                  const Icon = report.icon;
                  return (
                    <button
                      key={report.id}
                      onClick={() => setSelectedReport(index)}
                      className={`w-full text-left p-3 rounded-lg transition-all ${
                        selectedReport === index
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-accent hover:text-accent-foreground"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-md ${
                          selectedReport === index ? "bg-primary-foreground/20" : report.bgColor
                        }`}>
                          <Icon className={`h-4 w-4 ${
                            selectedReport === index ? "text-primary-foreground" : report.color
                          }`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{report.name}</div>
                          <div className={`text-xs mt-1 ${
                            selectedReport === index ? "text-primary-foreground/80" : "text-muted-foreground"
                          }`}>
                            <Clock className="inline h-3 w-3 mr-1" />
                            {report.lastUpdated}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Share Report
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh Data
              </Button>
            </CardContent>
          </Card>

          {/* Resources */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <a
                href="#"
                className="flex items-center text-sm hover:text-primary transition-colors"
              >
                <FileText className="mr-2 h-4 w-4" />
                Documentation
                <ExternalLink className="ml-auto h-3 w-3" />
              </a>
              <a
                href="#"
                className="flex items-center text-sm hover:text-primary transition-colors"
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                Power BI Desktop
                <ExternalLink className="ml-auto h-3 w-3" />
              </a>
            </CardContent>
          </Card>
        </div>

        {/* Report Display Area */}
        <div className="lg:col-span-3">
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CardTitle>{reports[selectedReport].name}</CardTitle>
                    <Badge variant="secondary">{reports[selectedReport].category}</Badge>
                  </div>
                  <CardDescription>
                    {reports[selectedReport].description}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Expand className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="p-0">
              <PowerBIEmbed
                embedUrl={reports[selectedReport].embedUrl}
                reportId={reports[selectedReport].id}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
