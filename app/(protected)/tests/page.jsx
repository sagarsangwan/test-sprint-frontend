import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { getFormattedDate } from "@/lib/date-time-format/date-format";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function TestsPage() {
  const session = await auth();
  if (!session?.user) redirect("/");

  // 🧠 Fetch unattempted tests
  const unAttemptedTests = await prisma.test.findMany({
    where: {
      userId: session.user.id,
      results: { none: { userId: session.user.id } },
    },
    select: {
      id: true,
      title: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  // 🧠 Fetch attempted tests
  const attemptedTests = await prisma.test.findMany({
    where: {
      results: {
        some: {
          userId: session.user.id,
        },
      },
    },
    select: {
      id: true,
      title: true,
      createdAt: true,
      results: {
        where: { userId: session.user.id },
        select: {
          id: true,
          totalScore: true,
          totalTimeTaken: true,
          finishedAt: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8 space-y-10">
      {/* 🟢 Unattempted Tests */}
      <section>
        <h1 className="text-3xl font-bold text-foreground">Active Tests</h1>
        <p className="text-muted-foreground mt-2">Start or continue a test</p>

        {unAttemptedTests.length === 0 ? (
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>No Active Tests</CardTitle>
              <CardDescription>
                Upload a PDF to generate and start a new mock test.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Tests will appear here once you upload a question paper.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {unAttemptedTests.map((test) => (
              <Card
                key={test.id}
                className="hover:shadow-lg transition-all border-border"
              >
                <CardHeader>
                  <CardTitle className="truncate">{test.title}</CardTitle>
                  <CardDescription>
                    Created: {getFormattedDate(test.createdAt)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={`/tests/${test.id}`} className="block">
                    <Button className="w-full">Start Test</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* 🟣 Completed Tests */}
      <section>
        <h1 className="text-3xl font-bold text-foreground">Completed Tests</h1>
        <p className="text-muted-foreground mt-2">
          View your past test results
        </p>

        {attemptedTests.length === 0 ? (
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>No Completed Tests</CardTitle>
              <CardDescription>
                Once you complete tests, they’ll appear here with your score and
                time.
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {attemptedTests.map((test) => {
              const result = test.results[0];
              const mins = Math.floor(result.totalTimeTaken / 60);
              const secs = result.totalTimeTaken % 60;

              return (
                <Card
                  key={test.id}
                  className="hover:shadow-lg transition-all border-border"
                >
                  <CardHeader>
                    <CardTitle className="truncate">{test.title}</CardTitle>
                    <CardDescription>
                      Completed: {getFormattedDate(result.finishedAt)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Score:{" "}
                      <span className="font-semibold text-foreground">
                        {result.totalScore ?? 0}
                      </span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Time Taken:{" "}
                      <span className="font-semibold text-foreground">
                        {mins}m {secs}s
                      </span>
                    </p>

                    <Link href={`/results/${test.id}`} className="block">
                      <Button variant="outline" className="w-full">
                        View Result
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
