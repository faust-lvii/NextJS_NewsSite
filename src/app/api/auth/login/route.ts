import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { User } from '@/lib/db';
import dbConnect from '@/lib/db';
import { signToken, createAuthResponse } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { username, password } = await request.json();

    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json({ error: 'Kullanıcı bulunamadı' }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ error: 'Geçersiz şifre' }, { status: 401 });
    }

    const token = signToken({ userId: user._id, username: user.username });
    
    // Başarılı giriş yanıtını ve cookie'yi oluştur
    return createAuthResponse({ success: true }, token);
  } catch (error) {
    console.error('Giriş hatası:', error);
    return NextResponse.json({ error: 'Giriş yapılırken bir hata oluştu' }, { status: 500 });
  }
} 