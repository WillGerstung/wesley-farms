import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Download,
  FileSpreadsheet,
  BarChart3,
  Code2,
  Clock,
  Star,
  TrendingUp,
  Filter,
  Search,
  Upload,
} from "lucide-react";

export default function TemplatesPage() {
  const templates = [
    {
      name: "Monthly Sales Report",
      description: "Comprehensive sales analysis with YoY comparisons and forecasting",
      type: "Excel",
      category: "Sales",
      lastUpdated: "2025-01-15",
      downloads: 1245,
      rating: 4.8,
      size: "2.4 MB",
      icon: FileSpreadsheet,
      typeColor: "text-green-600",
      typeBg: "bg-green-50",
    },
    {
      name: "Inventory Analysis Dashboard",
      description: "PowerBI template with stock levels, turnover rates, and reorder points",
      type: "PowerBI",
      category: "Operations",
      lastUpdated: "2025-01-10",
      downloads: 989,
      rating: 4.9,
      size: "5.1 MB",
      icon: BarChart3,
      typeColor: "text-yellow-600",
      typeBg: "bg-yellow-50",
    },
    {
      name: "Customer Segmentation Model",
      description: "Python-based RFM analysis with clustering algorithms",
      type: "Python",
      category: "Analytics",
      lastUpdated: "2025-01-08",
      downloads: 756,
      rating: 4.7,
      size: "156 KB",
      icon: Code2,
      typeColor: "text-blue-600",
      typeBg: "bg-blue-50",
    },
    {
      name: "Financial KPI Dashboard",
      description: "Executive-level financial metrics with drill-down capabilities",
      type: "PowerBI",
      category: "Finance",
      lastUpdated: "2025-01-05",
      downloads: 1512,
      rating: 4.9,
      size: "3.8 MB",
      icon: BarChart3,
      typeColor: "text-yellow-600",
      typeBg: "bg-yellow-50",
    },
    {
      name: "Product Performance Report",
      description: "Detailed product analysis with profitability metrics",
      type: "Excel",
      category: "Sales",
      lastUpdated: "2025-01-12",
      downloads: 623,
      rating: 4.6,
      size: "1.8 MB",
      icon: FileSpreadsheet,
      typeColor: "text-green-600",
      typeBg: "bg-green-50",
    },
    {
      name: "Supply Chain Analytics",
      description: "End-to-end supply chain visibility and optimization template",
      type: "PowerBI",
      category: "Operations",
      lastUpdated: "2025-01-07",
      downloads: 834,
      rating: 4.8,
      size: "4.2 MB",
      icon: BarChart3,
      typeColor: "text-yellow-600",
      typeBg: "bg-yellow-50",
    },
  ];

  const categories = ["All", "Sales", "Operations", "Finance", "Analytics"];
  const types = ["All", "Excel", "PowerBI", "Python"];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold tracking-tight">Templates</h1>
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Submit Template
          </Button>
        </div>
        <p className="text-muted-foreground">
          Download pre-built templates to accelerate your reporting and analysis
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="text"
            placeholder="Search templates..."
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Category Tabs */}
      <Tabs defaultValue="All" className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <div className="flex gap-2">
            {types.slice(1).map((type) => (
              <Badge key={type} variant="outline" className="cursor-pointer hover:bg-accent">
                {type}
              </Badge>
            ))}
          </div>
        </div>

        {categories.map((category) => (
          <TabsContent key={category} value={category}>
            <div className="space-y-4">
              {templates
                .filter(template => category === "All" || template.category === category)
                .map((template, index) => {
                  const Icon = template.icon;
                  return (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-start gap-4 flex-1">
                            <div className={`p-3 rounded-lg ${template.typeBg}`}>
                              <Icon className={`h-6 w-6 ${template.typeColor}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h3 className="font-semibold text-lg">{template.name}</h3>
                                  <p className="text-muted-foreground text-sm mt-1">
                                    {template.description}
                                  </p>
                                </div>
                              </div>
                              
                              <div className="flex flex-wrap items-center gap-4 mt-3 text-sm">
                                <Badge variant="secondary">{template.type}</Badge>
                                <span className="flex items-center text-muted-foreground">
                                  <Clock className="mr-1 h-3 w-3" />
                                  Updated {template.lastUpdated}
                                </span>
                                <span className="flex items-center text-muted-foreground">
                                  <Download className="mr-1 h-3 w-3" />
                                  {template.downloads.toLocaleString()} downloads
                                </span>
                                <span className="flex items-center">
                                  <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  {template.rating}
                                </span>
                                <span className="text-muted-foreground">
                                  {template.size}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Preview
                            </Button>
                            <Button size="sm">
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Popular Templates Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-primary" />
          Trending Templates
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.slice(0, 3).map((template, index) => {
            const Icon = template.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-md ${template.typeBg}`}>
                      <Icon className={`h-5 w-5 ${template.typeColor}`} />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      #{index + 1} Popular
                    </Badge>
                  </div>
                  <CardTitle className="text-base">{template.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {template.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{template.rating}</span>
                      <span>•</span>
                      <span>{template.downloads} downloads</span>
                    </div>
                    <Button size="sm" variant="ghost">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
