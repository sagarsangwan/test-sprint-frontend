import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Sidebar } from "@/components/sidebar";
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
const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata = {
  title: "MockGenius - AI Mock Test Generator",
  description: "Generate structured mock tests from PDFs using AI",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`font-sans antialiased`}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <SignedIn>
              <div className="flex h-screen">
                <Sidebar />
                <main className="flex-1 overflow-auto">{children}</main>
              </div>
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
