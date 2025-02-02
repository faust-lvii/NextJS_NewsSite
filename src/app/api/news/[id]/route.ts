import { NextRequest, NextResponse } from 'next/server';
import { News } from '@/lib/db';
import dbConnect from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const news = await News.findById(params.id);
    
    if (!news) {
      return NextResponse.json(
        { message: 'Haber bulunamadı' },
        { status: 404 }
      );
    }

    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json(
      { message: 'Bir hata oluştu' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const body = await request.json();

    const updatedNews = await News.findByIdAndUpdate(
      params.id,
      body,
      { new: true }
    );

    if (!updatedNews) {
      return NextResponse.json(
        { message: 'Haber bulunamadı' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedNews);
  } catch (error) {
    return NextResponse.json(
      { message: 'Bir hata oluştu' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const deletedNews = await News.findByIdAndDelete(params.id);

    if (!deletedNews) {
      return NextResponse.json(
        { message: 'Haber bulunamadı' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Haber başarıyla silindi' });
  } catch (error) {
    return NextResponse.json(
      { message: 'Bir hata oluştu' },
      { status: 500 }
    );
  }
}