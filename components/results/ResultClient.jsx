"use client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Header from "./Header";
import SummaryCards from "./SummaryCards";
import OverviewTab from "./OverviewTab";
import AnalysisTab from "./AnalysisTab";
import ReviewTab from "./ReviewTab";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ResultClient({ resultData }) {
  const chartData = resultData.subjects.map((s) => ({
    name: s.name,
    correct: s.correct,
    incorrect: s.incorrect,
  }));
  const scoreData = resultData.subjects.map((s) => ({
    name: s.name,
    score: s.score,
  }));
  const pieData = [
    {
      name: "Correct",
      value: resultData.subjects.reduce((a, s) => a + s.correct, 0),
    },
    {
      name: "Incorrect",
      value: resultData.subjects.reduce((a, s) => a + s.incorrect, 0),
    },
  ];
  const totalCorrect = resultData.subjects.reduce((a, s) => a + s.correct, 0);
  const totalIncorrect = resultData.subjects.reduce(
    (a, s) => a + s.incorrect,
    0
  );
  const accuracy = Math.round(
    (totalCorrect / (totalCorrect + totalIncorrect)) * 100
  );

  return (
    <div className="p-8">
      <Header
        testName={resultData.testName}
        submittedAt={resultData.submittedAt}
      />
      <SummaryCards
        totalScore={resultData.totalScore}
        totalMarks={resultData.totalMarks}
        totalCorrect={totalCorrect}
        totalIncorrect={totalIncorrect}
        accuracy={accuracy}
        timeTaken={resultData.timeTaken}
      />

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="review">Review</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab
            scoreData={scoreData}
            pieData={pieData}
            subjects={resultData.subjects}
          />
        </TabsContent>
        <TabsContent value="analysis">
          <AnalysisTab chartData={chartData} />
        </TabsContent>
        <TabsContent value="review">
          <ReviewTab questionReviews={resultData.questionReviews} />
        </TabsContent>
      </Tabs>

      <div className="flex gap-3 mt-8">
        <Link href="/dashboard" className="flex-1">
          <Button variant="outline" className="w-full">
            Back to Dashboard
          </Button>
        </Link>
        <Link href="/upload" className="flex-1">
          <Button className="w-full">Take Another Test</Button>
        </Link>
      </div>
    </div>
  );
}
