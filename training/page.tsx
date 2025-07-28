import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  GraduationCap,
  Clock,
  Award,
  PlayCircle,
  CheckCircle,
  Lock,
  TrendingUp,
  BookOpen,
  Target,
  Zap,
  Users,
  Calendar,
} from "lucide-react";

export default function TrainingPage() {
  const trainingModules = [
    {
      id: 1,
      title: "Introduction to Power BI",
      category: "Beginner",
      duration: "2 hours",
      modules: 8,
      progress: 100,
      completed: true,
      description: "Master the fundamentals of Power BI and create your first interactive reports",
      instructor: "Sarah Johnson",
      rating: 4.9,
      enrolled: 1234,
      skills: ["Data Modeling", "DAX Basics", "Report Design"],
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      id: 2,
      title: "Advanced Data Modeling",
      category: "Advanced",
      duration: "4 hours",
      modules: 12,
      progress: 75,
      completed: false,
      description: "Deep dive into complex data relationships, advanced DAX, and performance optimization",
      instructor: "Michael Chen",
      rating: 4.8,
      enrolled: 567,
      skills: ["Complex DAX", "Data Architecture", "Performance Tuning"],
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      id: 3,
      title: "Sales Dashboard Best Practices",
      category: "Intermediate",
      duration: "3 hours",
      modules: 10,
      progress: 50,
      completed: false,
      description: "Design effective sales dashboards that drive insights and business decisions",
      instructor: "Emily Rodriguez",
      rating: 4.7,
      enrolled: 890,
      skills: ["Dashboard Design", "KPI Selection", "Visual Best Practices"],
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      id: 4,
      title: "Data Security and Governance",
      category: "Intermediate",
      duration: "2.5 hours",
      modules: 6,
      progress: 0,
      completed: false,
      description: "Implement robust security policies and governance practices for your data platform",
      instructor: "David Park",
      rating: 4.6,
      enrolled: 445,
      skills: ["Row-Level Security", "Data Policies", "Compliance"],
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  const upcomingWebinars = [
    {
      title: "What's New in Power BI",
      date: "Feb 5, 2025",
      time: "2:00 PM EST",
      speaker: "Power BI Team",
    },
    {
      title: "ETL Best Practices",
      date: "Feb 12, 2025",
      time: "3:00 PM EST",
      speaker: "Tech Lead",
    },
  ];

  const learningPaths = [
    { name: "Data Analyst", courses: 5, duration: "20 hours", level: "Beginner" },
    { name: "BI Developer", courses: 8, duration: "32 hours", level: "Intermediate" },
    { name: "Data Architect", courses: 10, duration: "40 hours", level: "Advanced" },
  ];

  const totalProgress = Math.round(
    trainingModules.reduce((acc, module) => acc + module.progress, 0) / trainingModules.length
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Training Center</h1>
        <p className="text-muted-foreground">
          Enhance your skills with expert-led courses and certifications
        </p>
      </div>

      {/* Learning Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Overall Progress</p>
                <p className="text-2xl font-bold">{totalProgress}%</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
            </div>
            <Progress value={totalProgress} className="mt-3" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Courses Completed</p>
                <p className="text-2xl font-bold">1 / 4</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <Award className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Learning Hours</p>
                <p className="text-2xl font-bold">11.5</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Certificates</p>
                <p className="text-2xl font-bold">1</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="courses" className="space-y-8">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="paths">Learning Paths</TabsTrigger>
          <TabsTrigger value="webinars">Webinars</TabsTrigger>
        </TabsList>

        {/* Courses Tab */}
        <TabsContent value="courses" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {trainingModules.map((module) => (
              <Card key={module.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className={`p-3 rounded-lg ${module.bgColor}`}>
                      <GraduationCap className={`h-6 w-6 ${module.color}`} />
                    </div>
                    <Badge variant={module.completed ? "default" : "secondary"}>
                      {module.category}
                    </Badge>
                  </div>
                  <CardTitle>{module.title}</CardTitle>
                  <CardDescription>{module.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Instructor Info */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        By {module.instructor}
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="font-medium">{module.rating}</span>
                        <span className="text-yellow-500">★</span>
                        <span className="text-muted-foreground">
                          ({module.enrolled})
                        </span>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2">
                      {module.skills.map((skill, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    {/* Progress */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{module.progress}%</span>
                      </div>
                      <Progress value={module.progress} className="h-2" />
                    </div>

                    {/* Course Info */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {module.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          {module.modules} modules
                        </span>
                      </div>
                      <Button
                        size="sm"
                        variant={module.completed ? "outline" : "default"}
                      >
                        {module.completed ? (
                          <>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Review
                          </>
                        ) : module.progress > 0 ? (
                          <>
                            <PlayCircle className="mr-2 h-4 w-4" />
                            Continue
                          </>
                        ) : (
                          <>
                            <PlayCircle className="mr-2 h-4 w-4" />
                            Start
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Learning Paths Tab */}
        <TabsContent value="paths" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {learningPaths.map((path, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <Target className="h-8 w-8 text-primary" />
                    <Badge variant="outline">{path.level}</Badge>
                  </div>
                  <CardTitle>{path.name}</CardTitle>
                  <CardDescription>
                    Complete learning path to master {path.name.toLowerCase()} skills
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Courses</span>
                      <span className="font-medium">{path.courses}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-medium">{path.duration}</span>
                    </div>
                    <Button className="w-full mt-4" variant="outline">
                      View Path
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Webinars Tab */}
        <TabsContent value="webinars" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Webinars</CardTitle>
              <CardDescription>
                Join live sessions with industry experts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingWebinars.map((webinar, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Zap className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{webinar.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {webinar.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {webinar.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {webinar.speaker}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button>Register</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
