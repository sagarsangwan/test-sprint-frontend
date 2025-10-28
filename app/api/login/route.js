import { auth } from "@/lib/lucia";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 400 }
      );

    const valid = await bcrypt.compare(password, user.hashedPassword);
    if (!valid)
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 400 }
      );

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
