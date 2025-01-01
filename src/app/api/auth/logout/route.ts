import { NextResponse } from 'next/server';
import { removeAuthResponse } from '@/lib/auth';

export async function POST() {
  try {
    return removeAuthResponse({ success: true });
  } catch (error) {
    console.error('Çıkış hatası:', error);
    return NextResponse.json({ error: 'Çıkış yapılırken bir hata oluştu' }, { status: 500 });
  }
} 