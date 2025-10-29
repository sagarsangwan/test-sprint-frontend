// import { NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";
export async function proxy(req) {}
// export async function proxy(req) {
//   const token = await getToken({ req, secret: process.env.AUTH_SECRET });
//   console.log(token);
//   const { pathname } = req.nextUrl;

//   // ✅ Public routes that don't need authentication
//   const publicPaths = ["/", "/auth/register", "/api/auth"];

//   if (publicPaths.some((path) => pathname.startsWith(path))) {
//     return NextResponse.next();
//   }

//   // 🚫 Redirect to login if not authenticated
//   if (!token) {
//     const loginUrl = new URL("/", req.url);
//     loginUrl.searchParams.set("callbackUrl", req.url);
//     return NextResponse.redirect(loginUrl);
//   }

//   // ✅ Allow access
//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/dashboard/:path*",
//     "/upload/:path*",
//     "/tests/:path*",
//     "/results/:path*",
//     "/profile/:path*",
//     "/api/protected/:path*",
//   ],
// };
