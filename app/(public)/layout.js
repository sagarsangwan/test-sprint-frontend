import { Geist } from "next/font/google";
import "../globals.css";

import { ThemeProvider } from "@/components/theme-provider";

const font = Geist({ subsets: ["latin"] });
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";
export const metadata = {
  title: "TestSprint - AI Mock Test Generator",
  description: "Generate structured mock tests from PDFs using AI",
};

export default function PublicLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <SessionProvider>
        <body className={`${font.className} antialiased`}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <Toaster position="top-right" richColors />
          </ThemeProvider>
        </body>
      </SessionProvider>
    </html>
  );
}
