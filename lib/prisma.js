// import { PrismaClient } from "@prisma/client";

// const globalForPrisma = globalThis;

// const prisma =
//   globalForPrisma.prisma ||
//   new PrismaClient({
//     log: ["error"],
//   });

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// export default prisma;

import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

// --- Global Setup ---
// In Node.js, we access the global scope directly.
// This allows us to share the client instance across the entire application,
// which is essential for environments with hot-reloading (like Next.js development).
const globalForPrisma = global;

// --- Initialize or Reuse Prisma Client ---
const prisma =
  // 1. Check if an instance already exists on the global object.
  globalForPrisma.prisma ||
  // 2. If not, create a new instance and apply the Accelerate extension.
  new PrismaClient().$extends(withAccelerate());

// --- Development Singleton Fix ---
// In non-production environments, we attach the new instance to the global
// object. This prevents the server from creating multiple Prisma instances
// during hot reloads, which can exhaust database connections.
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// --- Export ---
export default prisma;
