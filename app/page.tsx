import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Database, FileText, GraduationCap, ArrowRight, Activity, TrendingUp, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const navigationCards = [
    {
      title: "Reports",
      description: "Access your PowerBI reports and analytics dashboards",
      icon: BarChart3,
      href: "/reports",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      stats: "12 Active Reports",
    },
    {
      title: "Data Apps",
      description: "Launch data applications and analytical tools",
      icon: Database,
      href: "/data-apps",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      stats: "8 Applications",
    },
    {
      title: "Templates",
      description: "Download pre-built templates for reports and analyses",
      icon: FileText,
      href: "/templates",
      color: "text-green-600",
      bgColor: "bg-green-50",
      stats: "24 Templates",
    },
    {
      title: "Training",
      description: "Enhance your skills with comprehensive training modules",
      icon: GraduationCap,
      href: "/training",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      stats: "4 Courses",
    },
  ];

  const quickStats = [
    { label: "Active Users", value: "1,234", icon: Users, trend: "+12%" },
    { label: "Reports Generated", value: "5,678", icon: Activity, trend: "+23%" },
    { label: "Data Processed", value: "2.4TB", icon: Database, trend: "+18%" },
    { label: "Uptime", value: "99.9%", icon: TrendingUp, trend: "Stable" },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-background">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <Badge variant="secondary" className="mb-4">
              Data Platform v2.0
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Wesley Farm Supply
              <span className="block text-primary mt-2">Data Platform</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Your centralized hub for reports, analytics, and data-driven insights.
              Access everything you need to make informed decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="container mx-auto px-4 -mt-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickStats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-green-600 mt-1">{stat.trend}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-slate-100 dark:bg-slate-800`}>
                    <stat.icon className="h-6 w-6 text-slate-600 dark:text-slate-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Navigation Cards */}
      <section className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {navigationCards.map((card, index) => (
            <Link key={index} href={card.href}>
              <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                <CardHeader>
                  <div className={`p-3 rounded-lg ${card.bgColor} w-fit mb-4`}>
                    <card.icon className={`h-8 w-8 ${card.color}`} />
                  </div>
                  <CardTitle className="flex items-center justify-between">
                    {card.title}
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                  </CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary">{card.stats}</Badge>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Report Section */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">Featured Report</h2>
            <p className="text-muted-foreground mt-2">
              Quick access to your most viewed report
            </p>
          </div>
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Monthly Sales Dashboard</CardTitle>
                  <CardDescription>
                    Real-time sales performance metrics and trends
                  </CardDescription>
                </div>
                <Button asChild>
                  <Link href="/reports">
                    View All Reports
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-500 dark:text-slate-400">
                    PowerBI Report Preview
                  </p>
                  <Button variant="outline" className="mt-4" asChild>
                    <Link href="/reports">Open Report</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
