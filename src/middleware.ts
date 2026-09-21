import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const locale = pathname === "/es" || pathname.startsWith("/es/") ? "es" : "en"
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-locale", locale)

  return NextResponse.next({
    request: {
      headers: requestHeaders
    }
  })
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|images|icon|apple-icon|favicon.ico|.*\\..*).*)"]
}
