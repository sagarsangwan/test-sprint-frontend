"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Mail, Calendar, Award, TrendingUp, Edit2 } from "lucide-react";
import { useSession } from "next-auth/react";

const mockUserData = {
  name: "John Doe",
  email: "john@example.com",
  joinDate: "2024-09-15",
  totalTests: 12,
  averageScore: 76,
  bestScore: 92,
  accuracy: 78,
};

const mockTestHistory = [
  {
    id: "1",
    name: "JEE Main 2024 - Physics",
    date: "2024-10-20",
    score: 78,
    totalMarks: 100,
    accuracy: 78,
    timeTaken: "40m 15s",
  },
  {
    id: "2",
    name: "NEET Biology Practice",
    date: "2024-10-18",
    score: 72,
    totalMarks: 100,
    accuracy: 72,
    timeTaken: "42m 30s",
  },
  {
    id: "3",
    name: "JEE Main 2024 - Chemistry",
    date: "2024-10-15",
    score: 85,
    totalMarks: 100,
    accuracy: 85,
    timeTaken: "38m 45s",
  },
  {
    id: "4",
    name: "NEET Chemistry Practice",
    date: "2024-10-12",
    score: 92,
    totalMarks: 100,
    accuracy: 92,
    timeTaken: "35m 20s",
  },
  {
    id: "5",
    name: "JEE Main 2024 - Maths",
    date: "2024-10-10",
    score: 68,
    totalMarks: 100,
    accuracy: 68,
    timeTaken: "45m 10s",
  },
];

const progressData = [
  { date: "Oct 1", score: 65, accuracy: 65 },
  { date: "Oct 5", score: 70, accuracy: 70 },
  { date: "Oct 10", score: 68, accuracy: 68 },
  { date: "Oct 12", score: 92, accuracy: 92 },
  { date: "Oct 15", score: 85, accuracy: 85 },
  { date: "Oct 18", score: 72, accuracy: 72 },
  { date: "Oct 20", score: 78, accuracy: 78 },
];

export default function ProfilePage() {
  const { data: session, isLoading } = useSession();

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Profile</h1>
          <p className="text-muted-foreground mt-2">
            View your test history and statistics
          </p>
        </div>
        <Button className="gap-2">
          <Edit2 className="w-4 h-4" />
          Edit Profile
        </Button>
      </div>

      {/* User Info Card */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* User Details */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {session?.user?.fullName}
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-foreground">{session?.user?.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Member Since
                    </p>
                    <p className="text-foreground">
                      {session?.user?.createdAt}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">
                  Total Tests
                </p>
                <p className="text-2xl font-bold text-primary">
                  {mockUserData.totalTests}
                </p>
              </div>
              <div className="p-4 bg-accent/10 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">
                  Average Score
                </p>
                <p className="text-2xl font-bold text-accent">
                  {mockUserData.averageScore}%
                </p>
              </div>
              <div className="p-4 bg-green-500/10 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Best Score</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {mockUserData.bestScore}%
                </p>
              </div>
              <div className="p-4 bg-blue-500/10 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">
                  Overall Accuracy
                </p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {mockUserData.accuracy}%
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* <Tabs defaultValue="progress" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="history">Test History</TabsTrigger>
        </TabsList>

        <TabsContent value="progress" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Score Trend</CardTitle>
              <CardDescription>Your performance over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#4f46e5"
                    strokeWidth={2}
                    dot={{ fill: "#4f46e5", r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Score"
                  />
                  <Line
                    type="monotone"
                    dataKey="accuracy"
                    stroke="#06b6d4"
                    strokeWidth={2}
                    dot={{ fill: "#06b6d4", r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Accuracy"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Improvement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  +13%
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  from first to last test
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Consistency
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-primary">78%</p>
                <p className="text-xs text-muted-foreground mt-1">
                  average consistency
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Streak
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-accent">7 days</p>
                <p className="text-xs text-muted-foreground mt-1">
                  current test streak
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Tests</CardTitle>
              <CardDescription>
                Your test history and performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTestHistory.map((test) => (
                  <div
                    key={test.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">
                        {test.name}
                      </h3>
                      <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                        <span>{test.date}</span>
                        <span>Time: {test.timeTaken}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Score</p>
                        <p className="text-lg font-bold text-primary">
                          {test.score}/{test.totalMarks}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">
                          Accuracy
                        </p>
                        <p className="text-lg font-bold text-accent">
                          {test.accuracy}%
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-transparent"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs> */}
    </div>
  );
}
