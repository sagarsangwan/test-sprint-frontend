import prisma from "@/lib/prisma";
import ResultClient from "@/components/results/ResultClient";
import { auth } from "@/lib/auth";

export default async function ResultPage({ params }) {
  const { id } = await params;
  const session = await auth();
  const userId = session?.user?.id;

  // ✅ Fetch test with related results for this user
  const test = await prisma.Test.findUnique({
    where: { id },
    include: {
      subjects: {
        include: {
          subjectScores: {
            where: { result: { userId } },
          },
          questions: true,
        },
      },
      results: {
        where: { userId },
        include: {
          subjectScores: { include: { subject: true } },
          answers: true,
        },
      },
    },
  });

  if (!test) {
    return (
      <div className="p-10 text-center text-muted-foreground">
        <h2 className="text-xl font-semibold">Test not found</h2>
        <p className="mt-2 text-sm">No test found for this ID.</p>
      </div>
    );
  }

  const result = test.results[0];
  if (!result) {
    return (
      <div className="p-10 text-center text-muted-foreground">
        <h2 className="text-xl font-semibold">Result not found</h2>
        <p className="mt-2 text-sm">You haven't attempted this test yet.</p>
      </div>
    );
  }

  // ✅ Build the data object for <ResultClient />
  const allQuestions = test.subjects.flatMap((s) => s.questions);

  const questionReviews = allQuestions.map((q) => {
    const ans = result.answers.find((a) => a.questionId === q.id);
    return {
      id: q.id,
      subject:
        test.subjects.find((s) => s.id === q.subjectId)?.name || "Unknown",
      question: q.questionText,
      userAnswer: ans?.selectedOption || "", // empty means unattempted
      correctAnswer: q.correctAnswer,
      isCorrect: ans ? ans.isCorrect : false, // mark false if unattempted
    };
  });

  const data = {
    testName: test.title,
    totalScore: result.totalScore || 0,
    totalMarks: test.totalMarks || 100,
    timeTaken: result.totalTimeTaken,
    submittedAt: result.finishedAt,
    subjects: result.subjectScores.map((s) => ({
      name: s.subject.name,
      correct: s.correct,
      incorrect: s.wrong,
      total: s.totalQuestions,
      score: Math.round((s.correct / s.totalQuestions) * 100),
      timeTaken: s.timeTaken,
    })),
    questionReviews, // ✅ now includes unattempted questions
  };

  return <ResultClient resultData={data} />;
}
