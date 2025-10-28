import { auth } from "@/lib/lucia";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { generateIdFromEntropySize } from "lucia";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing)
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = generateIdFromEntropySize(10);

    const user = await prisma.user.create({
      data: { id: userId, name, email, hashedPassword },
    });

    const session = await auth.createSession({ userId: user.id });
    const sessionCookie = auth.createSessionCookie(session);

    const res = NextResponse.json({ success: true });
    res.headers.set("Set-Cookie", sessionCookie.serialize());
    return res;
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
