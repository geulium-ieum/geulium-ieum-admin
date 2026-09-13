import { getRefreshToken } from '@/lib/server/auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { userService } from './lib/service/user';

export async function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const token = await getRefreshToken();
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
