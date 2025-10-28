import { Geist } from "next/font/google";
import "../globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import {
  ClerkProvider,
  RedirectToSignIn,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
const font = Geist({ subsets: ["latin"] });

export const metadata = {
  title: "TestSprint - AI Mock Test Generator",
  description: "Generate structured mock tests from PDFs using AI",
};

export default function PublicLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${font.className} antialiased`}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
