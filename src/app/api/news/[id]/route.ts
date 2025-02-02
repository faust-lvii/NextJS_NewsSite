import { NextRequest, NextResponse } from 'next/server';
import { News } from '@/lib/db';
import dbConnect from '@/lib/db';

interface RequestContext {
  params: { id: string }
}

export async function GET(
  _request: NextRequest,
  context: RequestContext
) {
  try {
    await dbConnect();
    const news = await News.findById(context.params.id);
    
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
  context: RequestContext
) {
  try {
    await dbConnect();
    const body = await request.json();

    const updatedNews = await News.findByIdAndUpdate(
      context.params.id,
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
  _request: NextRequest,
  context: RequestContext
) {
  try {
    await dbConnect();
    const deletedNews = await News.findByIdAndDelete(context.params.id);

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