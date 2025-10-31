import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const { handlers, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials; // Find user in database, selecting ALL needed fields

        const user = await prisma.user.findUnique({
          where: { email },
        });
        if (!user) throw new Error("User not found"); // Validate password

        const isValid = await bcrypt.compare(password, user.password || "");
        if (!isValid) throw new Error("Invalid password");

        // IMPORTANT: The 'password' field should NOT be returned to NextAuth,
        // but since we selected it, we must delete it before returning the user object.
        const userWithoutPassword = { ...user };
        delete userWithoutPassword.password;

        return userWithoutPassword;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    // 1. JWT Callback: Runs whenever a JWT is created (sign in/session update)
    async jwt({ token, user }) {
      // The 'user' object is available here on sign-in
      if (user) {
        token.createdAt = user.createdAt;
      }
      return token;
    }, // 2. Session Callback: Runs whenever a session is accessed (client/server)

    async session({ session, token }) {
      // Retrieve fields from the JWT token
      if (token) {
        session.user.createdAt = token.createdAt;
        session.user.id = token.sub;
      }
      return session;
    },
  },
});
