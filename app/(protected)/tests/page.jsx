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
  if (!session?.user) {
    redirect("/");
  }
  const unAttemptedTest = await prisma.Test.findMany({
    where: {
      userId: session?.user?.id,
      results: { none: {} },
    },
    select: {
      id: true,
      title: true,
      createdAt: true,
    },
  });
  console.log(unAttemptedTest);
  const activeTests = [
    {
      id: "1",
      name: "JEE Main 2024 - Physics",
      progress: 0,
      createdAt: "2024-10-20",
    },
    {
      id: "2",
      name: "NEET Biology Practice",
      progress: 60,
      createdAt: "2024-10-18",
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Active Tests</h1>
        <p className="text-muted-foreground mt-2">Start or continue a test</p>
      </div>

      {unAttemptedTest.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No Active Tests</CardTitle>
            <CardDescription>
              Upload a PDF to generate and start a test
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Tests will appear here once you upload a question paper.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {unAttemptedTest.map((test) => (
            <Card key={test.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{test.title}</CardTitle>
                <CardDescription>
                  {getFormattedDate(test.createdAt)}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-foreground">
                      Progress
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {test.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${test.progress}%` }}
                    />
                  </div>
                </div> */}
                <Link href={`/tests/${test.id}`} className="block">
                  <Button className="w-full">
                    {/* {test.progress === 0 ? "Start Test" : "Continue Test"} */}
                    Start Test
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
