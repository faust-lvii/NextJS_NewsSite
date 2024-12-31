import { jwtVerify, SignJWT } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key'
);

const ISSUER = 'news-admin';
const AUDIENCE = 'news-app';

export async function signToken(payload: any) {
  try {
    const token = await new SignJWT({ ...payload })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setIssuer(ISSUER)
      .setAudience(AUDIENCE)
      .setExpirationTime('24h')
      .sign(JWT_SECRET);
    
    return token;
  } catch (error) {
    console.error('Token oluşturma hatası:', error);
    return null;
  }
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, {
      issuer: ISSUER,
      audience: AUDIENCE,
    });
    return payload;
  } catch (error) {
    console.error('Token doğrulama hatası:', error);
    return null;
  }
}

export async function getTokenFromRequest(request: NextRequest) {
  try {
    const token = request.cookies.get('auth_token')?.value;
    if (!token) {
      console.log('Cookie bulunamadı');
      return null;
    }
    const payload = await verifyToken(token);
    console.log('Token doğrulama sonucu:', payload ? 'Başarılı' : 'Başarısız');
    return payload;
  } catch (error) {
    console.error('Token alma hatası:', error);
    return null;
  }
}

export function createAuthResponse(data: any, token: string) {
  try {
    const response = NextResponse.json(data);
    response.cookies.set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 1 gün
      path: '/',
    });
    console.log('Auth cookie başarıyla ayarlandı');
    return response;
  } catch (error) {
    console.error('Auth response oluşturma hatası:', error);
    return NextResponse.json({ error: 'Kimlik doğrulama hatası' }, { status: 500 });
  }
}

export function removeAuthResponse(data: any) {
  try {
    const response = NextResponse.json(data);
    response.cookies.delete('auth_token');
    return response;
  } catch (error) {
    console.error('Auth cookie silme hatası:', error);
    return NextResponse.json({ error: 'Çıkış yapma hatası' }, { status: 500 });
  }
} 