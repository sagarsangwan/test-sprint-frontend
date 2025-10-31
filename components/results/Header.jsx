"use client";
import { Button } from "@/components/ui/button";
import { Download, Share2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Header({ testName, submittedAt }) {
  return (
    <div className="flex justify-between items-start mb-8">
      <div>
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-primary hover:text-primary/80 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-foreground">{testName}</h1>
        <p className="text-muted-foreground mt-2">
          {/* Test completed on {new Date(submittedAt).toLocaleDateString()} */}
        </p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" className="gap-2 bg-transparent">
          <Download className="w-4 h-4" />
          Download
        </Button>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Share2 className="w-4 h-4" />
          Share
        </Button>
      </div>
    </div>
  );
}
