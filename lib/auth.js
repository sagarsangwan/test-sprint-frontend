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
        const { email, password } = credentials;

        // Find user in database
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) throw new Error("User not found");

        // Validate password
        const isValid = await bcrypt.compare(password, user.password || "");
        if (!isValid) throw new Error("Invalid password");

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  secret: process.env.AUTH_SECRET,
});
