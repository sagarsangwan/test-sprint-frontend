// prisma.ts or db.ts
import { PrismaClient } from "@prisma/client";

// Prevent multiple instances in development with hot reloading
const prisma = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

export default prisma;
