import { NextResponse } from 'next/server';
import { News } from '@/lib/db';
import dbConnect from '@/lib/db';

interface Params {
  params: {
    id: string;
  };
}

// Tekil haber getir
export async function GET(request: Request, { params }: Params) {
  try {
    await dbConnect();
    const news = await News.findById(params.id);
    if (!news) {
      return NextResponse.json({ error: 'Haber bulunamadı' }, { status: 404 });
    }
    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json({ error: 'Haber yüklenirken bir hata oluştu' }, { status: 500 });
  }
}

// Haber güncelle
export async function PUT(request: Request, { params }: Params) {
  try {
    await dbConnect();
    const data = await request.json();
    const news = await News.findByIdAndUpdate(params.id, data, { new: true });
    if (!news) {
      return NextResponse.json({ error: 'Haber bulunamadı' }, { status: 404 });
    }
    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json({ error: 'Haber güncellenirken bir hata oluştu' }, { status: 500 });
  }
}

// Haber sil
export async function DELETE(request: Request, { params }: Params) {
  try {
    await dbConnect();
    const news = await News.findByIdAndDelete(params.id);
    if (!news) {
      return NextResponse.json({ error: 'Haber bulunamadı' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Haber başarıyla silindi' });
  } catch (error) {
    return NextResponse.json({ error: 'Haber silinirken bir hata oluştu' }, { status: 500 });
  }
} 