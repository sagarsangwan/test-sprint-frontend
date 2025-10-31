"use client";
import { Card, CardContent } from "@/components/ui/card";

export default function ReviewTab({ questionReviews }) {
  return (
    <div className="space-y-4">
      {questionReviews.map((r) => (
        <Card
          key={r.id}
          className={`border-l-4 ${
            r.isCorrect ? "border-l-green-500" : "border-l-red-500"
          }`}
        >
          <CardContent className="pt-6">
            <div className="flex justify-between mb-4">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase">
                  {r.subject}
                </p>
                <p className="font-medium">{r.question}</p>
              </div>
              <div
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  r.isCorrect
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {r.isCorrect ? "Correct" : "Incorrect"}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs font-semibold text-muted-foreground mb-2">
                  Your Answer
                </p>
                <p>{r.userAnswer}</p>
              </div>
              {!r.isCorrect && (
                <div className="p-3 bg-green-50 rounded-lg border">
                  <p className="text-xs font-semibold text-green-700 mb-2">
                    Correct Answer
                  </p>
                  <p>{r.correctAnswer}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
