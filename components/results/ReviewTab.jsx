"use client";
import { Card, CardContent } from "@/components/ui/card";

export default function ReviewTab({ questionReviews }) {
  // group and sort: attempted first, then unattempted
  const sortedReviews = [...questionReviews].sort((a, b) => {
    if (a.userAnswer && !b.userAnswer) return -1;
    if (!a.userAnswer && b.userAnswer) return 1;
    return 0;
  });

  return (
    <div className="space-y-4">
      {sortedReviews.map((r) => {
        const isUnattempted = !r.userAnswer; // no answer
        const isCorrect = r.isCorrect && !isUnattempted;
        const isWrong = !r.isCorrect && !isUnattempted;

        const borderColor = isUnattempted
          ? "border-l-gray-400"
          : isCorrect
          ? "border-l-green-500"
          : "border-l-red-500";

        const tagStyle = isUnattempted
          ? "bg-gray-100 text-gray-700"
          : isCorrect
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700";

        const tagText = isUnattempted
          ? "Unattempted"
          : isCorrect
          ? "Correct"
          : "Incorrect";

        return (
          <Card key={r.id} className={`border-l-4 ${borderColor}`}>
            <CardContent className="pt-6">
              <div className="flex justify-between mb-4">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase">
                    {r.subject}
                  </p>
                  <p className="font-medium">{r.question}</p>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${tagStyle}`}
                >
                  {tagText}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {!isUnattempted && (
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs font-semibold text-muted-foreground mb-2">
                      Your Answer
                    </p>
                    <p>{r.userAnswer}</p>
                  </div>
                )}

                {(isWrong || isUnattempted) && (
                  <div className="p-3 bg-green-50 rounded-lg border">
                    <p className="text-xs font-semibold text-green-700 mb-2">
                      Correct Answer
                    </p>
                    <p className="text-green-700">{r.correctAnswer}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
