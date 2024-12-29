import { NextResponse } from 'next/server';
import { News } from '@/lib/db';
import dbConnect from '@/lib/db';

// Tüm haberleri getir
export async function GET() {
  try {
    await dbConnect();
    const news = await News.find().sort({ date: -1 });
    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json({ error: 'Haberler yüklenirken bir hata oluştu' }, { status: 500 });
  }
}

// Yeni haber ekle
export async function POST(request: Request) {
  try {
    await dbConnect();
    const data = await request.json();
    const news = await News.create(data);
    return NextResponse.json(news, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Haber eklenirken bir hata oluştu' }, { status: 500 });
  }
} 