import AuthPage from "@/components/auth/sign-in-up";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function LandingPage() {
  const session = await auth();
  if (session?.user) {
    redirect("/dashboard");
  }
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to TestSprint 🚀</h1>
      <p className="text-muted-foreground mb-6">
        Upload your question paper and let AI generate a timed mock test for
        you.
      </p>

      <AuthPage />
    </main>
  );
}
