import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Mail,
  MessageSquare,
  Phone,
  BookOpen,
  ChevronRight,
  Zap,
  Shield,
  HeadphonesIcon,
  Search,
  FileText,
  Users,
  Settings,
  HelpCircle,
} from "lucide-react";

export default function SupportPage() {
  const supportChannels = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get detailed help via email",
      contact: "support@wesleyfarm.com",
      responseTime: "24 hours",
      availability: "24/7",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      action: "Send Email",
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Instant help from our team",
      contact: "Available on all pages",
      responseTime: "< 2 minutes",
      availability: "Mon-Fri, 9 AM - 5 PM EST",
      color: "text-green-600",
      bgColor: "bg-green-50",
      action: "Start Chat",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak with a specialist",
      contact: "+1 (555) 123-4567",
      responseTime: "Immediate",
      availability: "Mon-Fri, 8 AM - 6 PM EST",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      action: "Call Now",
    },
    {
      icon: BookOpen,
      title: "Knowledge Base",
      description: "Self-service help articles",
      contact: "500+ articles",
      responseTime: "Instant",
      availability: "Always available",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      action: "Browse Articles",
    },
  ];

  const faqItems = [
    {
      question: "How do I reset my password?",
      answer: "Click on 'Sign in' and select 'Forgot Password'. Follow the email instructions to reset your password securely.",
      category: "Account",
    },
    {
      question: "How often are reports updated?",
      answer: "Most reports refresh daily at 6 AM EST. Real-time dashboards update every 15 minutes. Check the refresh indicator on each report for specific timing.",
      category: "Reports",
    },
    {
      question: "Can I export data from reports?",
      answer: "Yes! Click the export button in any report toolbar to download data in Excel, CSV, or PDF format. Some reports also support PowerPoint exports.",
      category: "Reports",
    },
    {
      question: "Who should I contact for access issues?",
      answer: "For access requests or permission issues, email support@wesleyfarm.com or contact your system administrator directly.",
      category: "Access",
    },
    {
      question: "How do I create custom reports?",
      answer: "Use our Templates section to start with pre-built reports, or request custom development through the IT team. Power BI Pro users can also create their own.",
      category: "Reports",
    },
    {
      question: "What browsers are supported?",
      answer: "We support the latest versions of Chrome, Edge, Firefox, and Safari. For best performance, we recommend Chrome or Edge.",
      category: "Technical",
    },
  ];

  const quickLinks = [
    { icon: FileText, label: "User Guide", href: "#" },
    { icon: Settings, label: "Account Settings", href: "#" },
    { icon: Users, label: "Team Management", href: "#" },
    { icon: Shield, label: "Security Center", href: "#" },
  ];

  const recentUpdates = [
    { title: "New PowerBI Features", date: "Jan 25, 2025", type: "feature" },
    { title: "Scheduled Maintenance", date: "Feb 1, 2025", type: "maintenance" },
    { title: "Security Update", date: "Jan 20, 2025", type: "security" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Support Center</h1>
        <p className="text-muted-foreground">
          Get help when you need it, the way you want it
        </p>
      </div>

      {/* System Status Banner */}
      <Card className="mb-8 border-green-200 bg-green-50/50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse" />
              <span className="font-medium">All Systems Operational</span>
              <Badge variant="outline" className="ml-2">
                99.9% Uptime
              </Badge>
            </div>
            <span className="text-sm text-muted-foreground">
              Last checked: {new Date().toLocaleTimeString()}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Support Channels */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {supportChannels.map((channel, index) => {
          const Icon = channel.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className={`p-3 rounded-lg ${channel.bgColor} w-fit mb-4`}>
                  <Icon className={`h-6 w-6 ${channel.color}`} />
                </div>
                <CardTitle className="text-lg">{channel.title}</CardTitle>
                <CardDescription>{channel.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Response</span>
                    <span className="font-medium">{channel.responseTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Available</span>
                    <span className="font-medium text-xs">{channel.availability}</span>
                  </div>
                </div>
                <Separator />
                <div className="font-medium text-sm">{channel.contact}</div>
                <Button className="w-full" variant="outline">
                  {channel.action}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* FAQ Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Quick answers to common questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <details key={index} className="group">
                    <summary className="flex items-center justify-between cursor-pointer list-none p-4 rounded-lg hover:bg-accent transition-colors">
                      <div className="flex items-center gap-3">
                        <HelpCircle className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">{item.question}</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-open:rotate-90" />
                    </summary>
                    <div className="px-4 pb-4 pt-2 ml-8">
                      <p className="text-muted-foreground">{item.answer}</p>
                      <Badge variant="outline" className="mt-2">
                        {item.category}
                      </Badge>
                    </div>
                  </details>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t text-center">
                <p className="text-muted-foreground mb-4">
                  Can&apos;t find what you&apos;re looking for?
                </p>
                <Button>
                  <Search className="mr-2 h-4 w-4" />
                  Search All Help Articles
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Links */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {quickLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <a
                    key={index}
                    href={link.href}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-accent transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{link.label}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                  </a>
                );
              })}
            </CardContent>
          </Card>

          {/* Recent Updates */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Updates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentUpdates.map((update, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`mt-0.5 h-2 w-2 rounded-full ${
                    update.type === 'feature' ? 'bg-blue-500' :
                    update.type === 'maintenance' ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{update.title}</p>
                    <p className="text-xs text-muted-foreground">{update.date}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Priority Support */}
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Priority Support</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Need immediate assistance? Our priority support team is ready to help.
              </p>
              <Button className="w-full" size="sm">
                <HeadphonesIcon className="mr-2 h-4 w-4" />
                Contact Priority Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
