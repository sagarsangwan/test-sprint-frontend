// /api/start-test/route.js

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { userId, testId } = await req.json();

    if (!userId || !testId) {
      return NextResponse.json(
        { error: "Missing userId or testId" },
        { status: 400 }
      );
    }

    // check if result already exists
    let result = await prisma.result.findFirst({ where: { userId, testId } });

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

    // mark test as started
    await prisma.test.update({
      where: { id: testId },
      data: { aiStatus: "started" },
    });

    return NextResponse.json({
      success: true,
      message: "Test started successfully",
      resultId: result.id,
      startTime: result.startedAt,
    });
  } catch (err) {
    console.error("❌ start-test error:", err);
    return NextResponse.json(
      { error: "Failed to start test" },
      { status: 500 }
    );
  }
}
