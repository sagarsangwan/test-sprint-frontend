import { auth } from "@/lib/lucia";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    const existing = await prisma.user.findUnique({ where: { username } });
    if (existing) {
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { username, hashedPassword },
    });

    const session = await auth.createSession({
      userId: user.id,
      attributes: {},
    });
    const sessionCookie = auth.createSessionCookie(session);

    const res = NextResponse.json({ success: true });
    res.headers.set("Set-Cookie", sessionCookie.serialize());
    return res;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
