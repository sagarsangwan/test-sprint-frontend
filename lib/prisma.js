import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

// Use the standard global object to store the client in development
// to prevent creating new instances on every hot reload.
const globalForPrisma = global;

// Initialize PrismaClient with the accelerate extension.
// It checks if a global instance already exists before creating a new one.
const prisma =
  globalForPrisma.prisma || new PrismaClient().$extends(withAccelerate());

// Only store the instance globally when not in production.
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
