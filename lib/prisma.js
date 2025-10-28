// db.js (or wherever you save this file)

import { PrismaClient } from "../app/generated/prisma";
import { withAccelerate } from "@prisma/extension-accelerate";

const globalForPrisma = global;

const prisma =
  globalForPrisma.prisma || new PrismaClient().$extends(withAccelerate());

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
