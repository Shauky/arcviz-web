import { type NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const isAuth = !!token
  const { pathname } = request.nextUrl

  // Allow access to auth API routes
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next()
  }

  // Allow access to public routes
  if (
    pathname === "/" ||
    pathname.startsWith("/jobs") ||
    pathname.startsWith("/companies") ||
    pathname.startsWith("/contact") ||
    pathname.startsWith("/blog") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon")
  ) {
    return NextResponse.next()
  }

  // Redirect authenticated users away from auth pages
  if (pathname.startsWith("/auth") && isAuth) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  // Protect dashboard routes
  if (pathname.startsWith("/dashboard") && !isAuth) {
    return NextResponse.redirect(new URL("/auth/signin", request.url))
  }

  // Protect admin routes
  if (pathname.startsWith("/admin")) {
    if (!isAuth) {
      return NextResponse.redirect(new URL("/auth/signin", request.url))
    }
    if (token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
  }

  // Handle onboarding flow
  if (pathname.startsWith("/onboarding") && !isAuth) {
    return NextResponse.redirect(new URL("/auth/signin", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
