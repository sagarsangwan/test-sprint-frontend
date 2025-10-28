import { Lucia } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import prisma from "./prisma";

export const auth = new Lucia(new PrismaAdapter(prisma), {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (user) => ({
    username: user.username,
  }),
});

export const { validateRequest } = auth;
