import { getToken } from '@/lib/server/auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const token = await getToken();
  const isLoginPage = url.pathname === "/login";
  if (token && isLoginPage) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }
  if (!token && !isLoginPage) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
};

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'
}
