import { NextRequest, NextResponse } from 'next/server';
import { News } from '@/lib/db';
import dbConnect from '@/lib/db';

type RouteParams = {
  params: {
    id: string;
  };
};

export async function GET(
  _request: NextRequest,
  context: RouteParams
) {
  try {
    await dbConnect();

    const news = await News.findById(context.params.id);
    
    if (!news) {
      return NextResponse.json(
        { error: 'Haber bulunamadı' },
        { status: 404 }
      );
    }

    return NextResponse.json(news);
  } catch (error) {
    console.error('Haber detayı yüklenirken hata:', error);
    return NextResponse.json(
      { error: 'Haber detayı yüklenirken bir hata oluştu' },
      { status: 500 }
    );
  }
}

// Haber güncelle
export async function PUT(
  request: NextRequest,
  context: RouteParams
) {
  try {
    await dbConnect();
    const data = await request.json();
    const news = await News.findByIdAndUpdate(context.params.id, data, { new: true });
    
    if (!news) {
      return NextResponse.json(
        { error: 'Haber bulunamadı' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(news);
  } catch (error) {
    console.error('Haber güncellenirken hata:', error);
    return NextResponse.json(
      { error: 'Haber güncellenirken bir hata oluştu' },
      { status: 500 }
    );
  }
}

// Haber sil
export async function DELETE(
  _request: NextRequest,
  context: RouteParams
) {
  try {
    await dbConnect();
    const news = await News.findByIdAndDelete(context.params.id);
    
    if (!news) {
      return NextResponse.json(
        { error: 'Haber bulunamadı' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: 'Haber başarıyla silindi' });
  } catch (error) {
    console.error('Haber silinirken hata:', error);
    return NextResponse.json(
      { error: 'Haber silinirken bir hata oluştu' },
      { status: 500 }
    );
  }
} 