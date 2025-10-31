import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }
  const attemptedTests = await prisma.test.findMany({
    where: {
      results: {
        some: {
          userId: session?.user?.id, // ✅ only if this user has a result
        },
      },
    },
    select: {
      id: true,
      title: true,
      createdAt: true,
      results: {
        where: {
          userId: session?.user?.id, // ✅ fetch only this user’s result
        },
        select: {
          id: true,
          totalScore: true,
          totalTimeTaken: true,
          finishedAt: true,
        },
      },
    },
  });

  console.log(attemptedTests);
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black"></div>
  );
}
