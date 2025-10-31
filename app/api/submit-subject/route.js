import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { testId, subjectId, userId, answers } = body;

    if (!testId || !subjectId || !userId || !answers) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // ✅ Create or find a Result for this user & test
    let result = await prisma.result.findFirst({
      where: { userId, testId },
    });

    if (!result) {
      result = await prisma.result.create({
        data: {
          userId,
          testId,
          totalScore: 0,
          totalTimeTaken: 0,
          startedAt: new Date(),
        },
      });
    }

    // ✅ Insert each answer
    const answerEntries = Object.entries(answers).map(
      ([questionId, selected]) => ({
        resultId: result.id,
        questionId,
        selectedOption: selected,
        isCorrect: false, // we'll check this below
      })
    );

    // Fetch correct answers for submitted questions
    const questionIds = Object.keys(answers);
    const questions = await prisma.question.findMany({
      where: { id: { in: questionIds } },
      select: { id: true, correctAnswer: true },
    });

    // Compare and update correctness
    for (const entry of answerEntries) {
      const q = questions.find((x) => x.id === entry.questionId);
      if (q && q.correctAnswer === entry.selectedOption) entry.isCorrect = true;
    }

    // Bulk insert
    await prisma.answer.createMany({ data: answerEntries });

    // ✅ Calculate subject score
    const correctCount = answerEntries.filter((a) => a.isCorrect).length;
    const total = answerEntries.length;

    await prisma.subjectScore.create({
      data: {
        subjectId,
        resultId: result.id,
        score: correctCount,
        totalQuestions: total,
        correct: correctCount,
        wrong: total - correctCount,
        timeTaken: 0,
        accuracy: Math.round((correctCount / total) * 100),
      },
    });

    // ✅ Update test progress (optional)
    await prisma.test.update({
      where: { id: testId },
      data: {
        aiStatus: "in_progress",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Subject submitted successfully",
      correct: correctCount,
      total,
    });
  } catch (err) {
    console.error("❌ API error:", err);
    return NextResponse.json(
      { error: "Failed to submit subject" },
      { status: 500 }
    );
  }
}
