import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getTokenFromRequest } from './lib/auth';

export async function middleware(request: NextRequest) {
  console.log('Middleware çalışıyor, path:', request.nextUrl.pathname);

  // Admin sayfalarını kontrol et
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Login sayfasına erişime izin ver
    if (request.nextUrl.pathname === '/admin/login') {
      // Eğer zaten giriş yapmışsa, admin paneline yönlendir
      const token = await getTokenFromRequest(request);
      if (token) {
        console.log('Kullanıcı zaten giriş yapmış, admin paneline yönlendiriliyor');
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      return NextResponse.next();
    }

    // Token kontrolü
    const token = await getTokenFromRequest(request);
    console.log('Token kontrolü:', token ? 'Token var' : 'Token yok');
    
    if (!token) {
      console.log('Token bulunamadı, login sayfasına yönlendiriliyor');
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('from', request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
}; 