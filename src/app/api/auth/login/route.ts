import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/lib/db';
import dbConnect from '@/lib/db';
import bcrypt from 'bcryptjs';
import { signToken, createAuthResponse } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { username, password } = await request.json();
    const user = await User.findOne({ username });

    if (!user) {
      return NextResponse.json(
        { error: 'Kullanıcı bulunamadı' },
        { status: 401 }
      );
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Geçersiz şifre' },
        { status: 401 }
      );
    }

    const token = await signToken({ userId: user._id, username: user.username });
    if (!token) {
      return NextResponse.json(
        { error: 'Kimlik doğrulama hatası' },
        { status: 500 }
      );
    }

    return createAuthResponse({ success: true }, token);
  } catch (error) {
    return NextResponse.json(
      { error: 'Giriş işlemi sırasında bir hata oluştu' },
      { status: 500 }
    );
  }
}
