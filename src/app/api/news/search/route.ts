import { NextResponse } from 'next/server';
import { News } from '@/lib/db';
import dbConnect from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json({ error: 'Arama terimi gerekli' }, { status: 400 });
    }

    await dbConnect();

    // Başlık, özet veya içerikte arama yap
    const news = await News.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { summary: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } }
      ]
    }).sort({ date: -1 });

    return NextResponse.json(news);
  } catch (error) {
    console.error('Arama hatası:', error);
    return NextResponse.json(
      { error: 'Arama yapılırken bir hata oluştu' },
      { status: 500 }
    );
  }
} 