import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { testId, userId, totalTimeTaken } = await req.json();

    if (!testId || !userId) {
      return NextResponse.json(
        { error: "Missing testId or userId" },
        { status: 400 }
      );
    }

    // ✅ Fetch all subject scores for this test + user
    const result = await prisma.result.findFirst({
      where: { testId, userId },
      include: {
        subjectScores: true,
      },
    });

    if (!result) {
      return NextResponse.json(
        { error: "No subject results found" },
        { status: 404 }
      );
    }

    // ✅ Calculate totals
    const totalQuestions = result.subjectScores.reduce(
      (sum, s) => sum + s.totalQuestions,
      0
    );
    const totalCorrect = result.subjectScores.reduce(
      (sum, s) => sum + s.correct,
      0
    );
    const totalWrong = result.subjectScores.reduce(
      (sum, s) => sum + s.wrong,
      0
    );

    const accuracy = Math.round((totalCorrect / totalQuestions) * 100);

    // ✅ Update result record
    const updated = await prisma.result.update({
      where: { id: result.id },
      data: {
        finishedAt: new Date(),
        totalScore: totalCorrect,
        accuracy,
        totalTimeTaken: totalTimeTaken, // you can pass this from frontend timer later
      },
    });

    // ✅ Mark test completed
    await prisma.test.update({
      where: { id: testId },
      data: { aiStatus: "completed" },
    });

    return NextResponse.json({
      success: true,
      message: "Test submitted successfully",
      totalQuestions,
      totalCorrect,
      totalWrong,
      accuracy,
    });
  } catch (err) {
    console.error("❌ Submit test error:", err);
    return NextResponse.json(
      { error: "Failed to submit test" },
      { status: 500 }
    );
  }
}
