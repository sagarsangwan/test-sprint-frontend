"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function SummaryCards({
  totalScore,
  totalMarks,
  totalCorrect,
  totalIncorrect,
  accuracy,
  timeTaken,
}) {
  const formatTime = (seconds) =>
    `${Math.floor(seconds / 60)}m ${seconds % 60}s`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card className="border-l-4 border-l-primary">
        <CardHeader>
          <CardTitle>Total Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-primary">{totalScore}</div>
          <p className="text-xs text-muted-foreground">out of {totalMarks}</p>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-green-500">
        <CardHeader>
          <CardTitle>Correct Answers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-green-600">
            {totalCorrect}
          </div>
          <p className="text-xs text-muted-foreground">
            out of {totalCorrect + totalIncorrect}
          </p>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-red-500">
        <CardHeader>
          <CardTitle>Incorrect Answers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-red-600">
            {totalIncorrect}
          </div>
          <p className="text-xs text-muted-foreground">accuracy: {accuracy}%</p>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-accent">
        <CardHeader>
          <CardTitle>Time Taken</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold ">{formatTime(timeTaken)}</div>
          <p className="text-xs text-muted-foreground">out of 50 minutes</p>
        </CardContent>
      </Card>
    </div>
  );
}
