// app/(public)/page.tsx
"use client";
import { SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to TestSprint 🚀</h1>
      <p className="text-muted-foreground mb-6">
        Upload your question paper and let AI generate a timed mock test for
        you.
      </p>
      <SignInButton mode="modal">
        <Button size="lg">Get Started</Button>
      </SignInButton>
    </main>
  );
}
