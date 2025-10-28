import { auth } from "@/lib/lucia";
import { NextResponse } from "next/server";

export async function POST(req) {
  const sessionId = auth.readSessionCookie(
    req.headers.get("cookie") ?? ""
  ).value;
  if (!sessionId)
    return NextResponse.json({ error: "No session" }, { status: 400 });

  await auth.invalidateSession(sessionId);
  const blankCookie = auth.createBlankSessionCookie();
  const res = NextResponse.json({ success: true });
  res.headers.set("Set-Cookie", blankCookie.serialize());
  return res;
}
