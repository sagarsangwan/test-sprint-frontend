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
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Download, Share2, ArrowLeft } from "lucide-react";
import Link from "next/link";

const mockResults = {
  testName: "JEE Main 2024 - Physics",
  totalScore: 78,
  totalMarks: 100,
  timeTaken: 2400, // seconds
  submittedAt: "2024-10-20T14:30:00",
  subjects: [
    {
      name: "Reasoning",
      correct: 8,
      incorrect: 2,
      total: 10,
      score: 80,
      timeTaken: 480,
    },
    {
      name: "GK",
      correct: 7,
      incorrect: 3,
      total: 10,
      score: 70,
      timeTaken: 420,
    },
    {
      name: "English",
      correct: 8,
      incorrect: 2,
      total: 10,
      score: 80,
      timeTaken: 480,
    },
    {
      name: "Maths",
      correct: 8,
      incorrect: 2,
      total: 10,
      score: 80,
      timeTaken: 600,
    },
    {
      name: "Hindi",
      correct: 5,
      incorrect: 5,
      total: 10,
      score: 50,
      timeTaken: 420,
    },
  ],
  questionReviews: [
    {
      id: "q1",
      subject: "Reasoning",
      question:
        "If all roses are flowers and some flowers fade, then which of the following must be true?",
      userAnswer: "Some roses fade",
      correctAnswer: "Some roses fade",
      isCorrect: true,
    },
    {
      id: "q2",
      subject: "Reasoning",
      question: "Complete the series: 2, 4, 8, 16, ?",
      userAnswer: "32",
      correctAnswer: "32",
      isCorrect: true,
    },
    {
      id: "q3",
      subject: "GK",
      question: "What is the capital of France?",
      userAnswer: "London",
      correctAnswer: "Paris",
      isCorrect: false,
    },
  ],
};

const chartData = mockResults.subjects.map((s) => ({
  name: s.name,
  correct: s.correct,
  incorrect: s.incorrect,
}));

const scoreData = mockResults.subjects.map((s) => ({
  name: s.name,
  score: s.score,
}));

const pieData = [
  {
    name: "Correct",
    value: mockResults.subjects.reduce((sum, s) => sum + s.correct, 0),
  },
  {
    name: "Incorrect",
    value: mockResults.subjects.reduce((sum, s) => sum + s.incorrect, 0),
  },
];

const COLORS = ["#4f46e5", "#ef4444"];

export default function ResultsPage() {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const totalCorrect = mockResults.subjects.reduce(
    (sum, s) => sum + s.correct,
    0
  );
  const totalIncorrect = mockResults.subjects.reduce(
    (sum, s) => sum + s.incorrect,
    0
  );
  const accuracy = Math.round(
    (totalCorrect / (totalCorrect + totalIncorrect)) * 100
  );

  return (
    // <div className="p-8">
    //   {/* Header */}
    //   <div className="flex justify-between items-start mb-8">
    //     <div>
    //       <Link
    //         href="/dashboard"
    //         className="flex items-center gap-2 text-primary hover:text-primary/80 mb-4"
    //       >
    //         <ArrowLeft className="w-4 h-4" />
    //         Back to Dashboard
    //       </Link>
    //       <h1 className="text-3xl font-bold text-foreground">
    //         {mockResults.testName}
    //       </h1>
    //       <p className="text-muted-foreground mt-2">
    //         Test completed on{" "}
    //         {new Date(mockResults.submittedAt).toLocaleDateString()}
    //       </p>
    //     </div>
    //     <div className="flex gap-2">
    //       <Button variant="outline" className="gap-2 bg-transparent">
    //         <Download className="w-4 h-4" />
    //         Download
    //       </Button>
    //       <Button variant="outline" className="gap-2 bg-transparent">
    //         <Share2 className="w-4 h-4" />
    //         Share
    //       </Button>
    //     </div>
    //   </div>

    //   {/* Score Summary */}
    //   <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
    //     <Card className="border-l-4 border-l-primary">
    //       <CardHeader className="pb-3">
    //         <CardTitle className="text-sm font-medium text-muted-foreground">
    //           Total Score
    //         </CardTitle>
    //       </CardHeader>
    //       <CardContent>
    //         <div className="text-3xl font-bold text-primary">
    //           {mockResults.totalScore}
    //         </div>
    //         <p className="text-xs text-muted-foreground mt-1">
    //           out of {mockResults.totalMarks}
    //         </p>
    //       </CardContent>
    //     </Card>

    //     <Card className="border-l-4 border-l-green-500">
    //       <CardHeader className="pb-3">
    //         <CardTitle className="text-sm font-medium text-muted-foreground">
    //           Correct Answers
    //         </CardTitle>
    //       </CardHeader>
    //       <CardContent>
    //         <div className="text-3xl font-bold text-green-600 dark:text-green-400">
    //           {totalCorrect}
    //         </div>
    //         <p className="text-xs text-muted-foreground mt-1">
    //           out of {totalCorrect + totalIncorrect}
    //         </p>
    //       </CardContent>
    //     </Card>

    //     <Card className="border-l-4 border-l-red-500">
    //       <CardHeader className="pb-3">
    //         <CardTitle className="text-sm font-medium text-muted-foreground">
    //           Incorrect Answers
    //         </CardTitle>
    //       </CardHeader>
    //       <CardContent>
    //         <div className="text-3xl font-bold text-red-600 dark:text-red-400">
    //           {totalIncorrect}
    //         </div>
    //         <p className="text-xs text-muted-foreground mt-1">
    //           accuracy: {accuracy}%
    //         </p>
    //       </CardContent>
    //     </Card>

    //     <Card className="border-l-4 border-l-accent">
    //       <CardHeader className="pb-3">
    //         <CardTitle className="text-sm font-medium text-muted-foreground">
    //           Time Taken
    //         </CardTitle>
    //       </CardHeader>
    //       <CardContent>
    //         <div className="text-3xl font-bold text-accent">
    //           {formatTime(mockResults.timeTaken)}
    //         </div>
    //         <p className="text-xs text-muted-foreground mt-1">
    //           out of 50 minutes
    //         </p>
    //       </CardContent>
    //     </Card>
    //   </div>

    //   {/* Analytics Tabs */}
    //   <Tabs defaultValue="overview" className="space-y-6">
    //     <TabsList className="grid w-full grid-cols-3">
    //       <TabsTrigger value="overview">Overview</TabsTrigger>
    //       <TabsTrigger value="analysis">Analysis</TabsTrigger>
    //       <TabsTrigger value="review">Review Answers</TabsTrigger>
    //     </TabsList>

    //     {/* Overview Tab */}
    //     <TabsContent value="overview" className="space-y-6">
    //       <Card>
    //         <CardHeader>
    //           <CardTitle>Subject-wise Performance</CardTitle>
    //           <CardDescription>Score breakdown by subject</CardDescription>
    //         </CardHeader>
    //         <CardContent>
    //           <ResponsiveContainer width="100%" height={300}>
    //             <BarChart data={scoreData}>
    //               <CartesianGrid strokeDasharray="3 3" />
    //               <XAxis dataKey="name" />
    //               <YAxis />
    //               <Tooltip />
    //               <Bar dataKey="score" fill="#4f46e5" radius={[8, 8, 0, 0]} />
    //             </BarChart>
    //           </ResponsiveContainer>
    //         </CardContent>
    //       </Card>

    //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    //         <Card>
    //           <CardHeader>
    //             <CardTitle>Correct vs Incorrect</CardTitle>
    //           </CardHeader>
    //           <CardContent>
    //             <ResponsiveContainer width="100%" height={250}>
    //               <PieChart>
    //                 <Pie
    //                   data={pieData}
    //                   cx="50%"
    //                   cy="50%"
    //                   labelLine={false}
    //                   label={({ name, value }) => `${name}: ${value}`}
    //                   outerRadius={80}
    //                   fill="#8884d8"
    //                   dataKey="value"
    //                 >
    //                   {pieData.map((entry, index) => (
    //                     <Cell
    //                       key={`cell-${index}`}
    //                       fill={COLORS[index % COLORS.length]}
    //                     />
    //                   ))}
    //                 </Pie>
    //                 <Tooltip />
    //               </PieChart>
    //             </ResponsiveContainer>
    //           </CardContent>
    //         </Card>

    //         <Card>
    //           <CardHeader>
    //             <CardTitle>Subject Details</CardTitle>
    //           </CardHeader>
    //           <CardContent>
    //             <div className="space-y-4">
    //               {mockResults.subjects.map((subject) => (
    //                 <div
    //                   key={subject.name}
    //                   className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
    //                 >
    //                   <div>
    //                     <p className="font-medium text-foreground">
    //                       {subject.name}
    //                     </p>
    //                     <p className="text-xs text-muted-foreground">
    //                       {subject.correct}/{subject.total} correct •{" "}
    //                       {formatTime(subject.timeTaken)}
    //                     </p>
    //                   </div>
    //                   <div className="text-right">
    //                     <p className="font-bold text-primary">
    //                       {subject.score}%
    //                     </p>
    //                   </div>
    //                 </div>
    //               ))}
    //             </div>
    //           </CardContent>
    //         </Card>
    //       </div>
    //     </TabsContent>

    //     {/* Analysis Tab */}
    //     <TabsContent value="analysis" className="space-y-6">
    //       <Card>
    //         <CardHeader>
    //           <CardTitle>Correct vs Incorrect by Subject</CardTitle>
    //           <CardDescription>
    //             Visual breakdown of your answers
    //           </CardDescription>
    //         </CardHeader>
    //         <CardContent>
    //           <ResponsiveContainer width="100%" height={300}>
    //             <BarChart data={chartData}>
    //               <CartesianGrid strokeDasharray="3 3" />
    //               <XAxis dataKey="name" />
    //               <YAxis />
    //               <Tooltip />
    //               <Legend />
    //               <Bar dataKey="correct" fill="#22c55e" radius={[8, 8, 0, 0]} />
    //               <Bar
    //                 dataKey="incorrect"
    //                 fill="#ef4444"
    //                 radius={[8, 8, 0, 0]}
    //               />
    //             </BarChart>
    //           </ResponsiveContainer>
    //         </CardContent>
    //       </Card>

    //       <Card>
    //         <CardHeader>
    //           <CardTitle>Performance Insights</CardTitle>
    //         </CardHeader>
    //         <CardContent className="space-y-4">
    //           <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
    //             <p className="font-semibold text-blue-900 dark:text-blue-100">
    //               Strong Areas
    //             </p>
    //             <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
    //               You performed well in Reasoning, English, and Maths with 80%
    //               accuracy in each.
    //             </p>
    //           </div>
    //           <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg border border-orange-200 dark:border-orange-800">
    //             <p className="font-semibold text-orange-900 dark:text-orange-100">
    //               Areas for Improvement
    //             </p>
    //             <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
    //               Focus on Hindi and GK. Consider practicing more questions in
    //               these subjects.
    //             </p>
    //           </div>
    //         </CardContent>
    //       </Card>
    //     </TabsContent>

    //     {/* Review Answers Tab */}
    //     <TabsContent value="review" className="space-y-4">
    //       {mockResults.questionReviews.map((review) => (
    //         <Card
    //           key={review.id}
    //           className={`border-l-4 ${
    //             review.isCorrect ? "border-l-green-500" : "border-l-red-500"
    //           }`}
    //         >
    //           <CardContent className="pt-6">
    //             <div className="flex items-start justify-between mb-4">
    //               <div>
    //                 <p className="text-xs font-semibold text-muted-foreground uppercase">
    //                   {review.subject}
    //                 </p>
    //                 <p className="font-medium text-foreground mt-2">
    //                   {review.question}
    //                 </p>
    //               </div>
    //               <div
    //                 className={`px-3 py-1 rounded-full text-xs font-semibold ${
    //                   review.isCorrect
    //                     ? "bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300"
    //                     : "bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300"
    //                 }`}
    //               >
    //                 {review.isCorrect ? "Correct" : "Incorrect"}
    //               </div>
    //             </div>

    //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    //               <div className="p-3 bg-muted/50 rounded-lg">
    //                 <p className="text-xs font-semibold text-muted-foreground mb-2">
    //                   Your Answer
    //                 </p>
    //                 <p className="text-foreground">{review.userAnswer}</p>
    //               </div>
    //               {!review.isCorrect && (
    //                 <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
    //                   <p className="text-xs font-semibold text-green-700 dark:text-green-300 mb-2">
    //                     Correct Answer
    //                   </p>
    //                   <p className="text-green-900 dark:text-green-100">
    //                     {review.correctAnswer}
    //                   </p>
    //                 </div>
    //               )}
    //             </div>
    //           </CardContent>
    //         </Card>
    //       ))}
    //     </TabsContent>
    //   </Tabs>

    //   {/* Action Buttons */}
    //   <div className="flex gap-3 mt-8">
    //     <Link href="/dashboard" className="flex-1">
    //       <Button variant="outline" className="w-full bg-transparent">
    //         Back to Dashboard
    //       </Button>
    //     </Link>
    //     <Link href="/upload" className="flex-1">
    //       <Button className="w-full">Take Another Test</Button>
    //     </Link>
    //   </div>
    // </div>
    <div className="flex h-screen justify-center text-center self-center">
      Test to dele pehle ekk aadhe tatti
    </div>
  );
}
