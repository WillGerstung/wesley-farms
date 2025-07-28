import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  Database, 
  DollarSign, 
  Package, 
  Users, 
  TrendingUp,
  ExternalLink,
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  Cloud
} from "lucide-react";
import Link from "next/link";

export default function DataAppsPage() {
  const dataApps = [
    {
      name: "Sales Analytics Dashboard",
      description: "Real-time sales performance tracking with predictive analytics",
      link: "#",
      icon: DollarSign,
      category: "Analytics",
      status: "active",
      users: "450+",
      features: ["Real-time data", "Predictive modeling", "Custom reports"],
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      name: "Inventory Management System",
      description: "Comprehensive inventory tracking with automated reorder points",
      link: "#",
      icon: Package,
      category: "Operations",
      status: "active",
      users: "320+",
      features: ["Barcode scanning", "Multi-location", "Auto-reorder"],
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      name: "Customer Insights Portal",
      description: "360-degree customer view with segmentation and behavior analysis",
      link: "#",
      icon: Users,
      category: "CRM",
      status: "active",
      users: "180+",
      features: ["Customer 360", "Segmentation", "Journey mapping"],
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      name: "Financial Forecasting Tool",
      description: "Advanced financial modeling with scenario planning capabilities",
      link: "#",
      icon: TrendingUp,
      category: "Finance",
      status: "beta",
      users: "95+",
      features: ["Scenario planning", "Cash flow", "Budget tracking"],
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  const categories = ["All", ...new Set(dataApps.map(app => app.category))];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold tracking-tight">Data Applications</h1>
          <Button>
            <Sparkles className="mr-2 h-4 w-4" />
            Request New App
          </Button>
        </div>
        <p className="text-muted-foreground">
          Access powerful data applications designed to streamline your business operations
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Apps</p>
                <p className="text-2xl font-bold">{dataApps.length}</p>
              </div>
              <Database className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold">1,045</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Uptime</p>
                <p className="text-2xl font-bold">99.9%</p>
              </div>
              <Zap className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Security</p>
                <p className="text-2xl font-bold">SOC 2</p>
              </div>
              <Shield className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Tabs */}
      <Tabs defaultValue="All" className="mb-8">
        <TabsList>
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {categories.map((category) => (
          <TabsContent key={category} value={category} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dataApps
                .filter(app => category === "All" || app.category === category)
                .map((app, index) => {
                  const Icon = app.icon;
                  return (
                    <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-4">
                          <div className={`p-3 rounded-lg ${app.bgColor}`}>
                            <Icon className={`h-6 w-6 ${app.color}`} />
                          </div>
                          <Badge variant={app.status === "active" ? "default" : "secondary"}>
                            {app.status}
                          </Badge>
                        </div>
                        <CardTitle>{app.name}</CardTitle>
                        <CardDescription>{app.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex flex-wrap gap-2">
                            {app.features.map((feature, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex items-center justify-between pt-4 border-t">
                            <span className="text-sm text-muted-foreground">
                              {app.users} active users
                            </span>
                            <Button variant="ghost" size="sm" className="group" asChild>
                              <Link href={app.link}>
                                Open App
                                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                              </Link>
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

      {/* CTA Section */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Cloud className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Need a custom application?</h3>
                <p className="text-muted-foreground">
                  Our team can build tailored solutions for your specific needs
                </p>
              </div>
            </div>
            <Button size="lg" variant="default">
              Contact IT Team
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
