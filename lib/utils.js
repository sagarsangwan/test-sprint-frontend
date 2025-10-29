import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import bcrypt from "bcryptjs";
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// export async function saltAndHashPassword(plainPassword) {
//   const saltRounds = 10;
//   const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
//   return hashedPassword;
// }
