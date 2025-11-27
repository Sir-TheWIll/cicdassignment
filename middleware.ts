import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Allow public routes
  const publicRoutes = ['/login', '/register', '/', '/api/health'];
  const isPublicRoute = publicRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Check for authentication token
  // Note: Token verification happens in API routes since middleware runs in Edge Runtime
  // which doesn't support Node.js crypto modules
  const token = request.cookies.get('token')?.value;

  if (!token) {
    // For API routes, return 401 instead of redirect
    if (request.nextUrl.pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    // For page routes, redirect to login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/tasks/:path*', '/tasks/:path*', '/dashboard/:path*'],
};
