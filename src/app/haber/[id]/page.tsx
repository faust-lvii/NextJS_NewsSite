import { News } from "@/lib/db";
import dbConnect from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function NewsDetail({ params }: PageProps) {
  try {
    await dbConnect();
    const news = await News.findById(params.id);
    
    if (!news) {
      notFound();
    }

    return (
      <main className="container mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6"
        >
          ← Ana Sayfaya Dön
        </Link>
        <article className="max-w-3xl mx-auto">
          <header className="mb-8">
            <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
              {news.category}
            </span>
            <h1 className="text-4xl font-bold mb-4">{news.title}</h1>
            <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400">
              {news.author && <span>Yazar: {news.author}</span>}
              <time>{new Date(news.date).toLocaleDateString('tr-TR')}</time>
            </div>
          </header>
          <div className="relative h-[400px] w-full mb-8">
            <Image
              src={news.imageUrl}
              alt={news.title}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {news.content}
            </ReactMarkdown>
          </div>
        </article>
      </main>
    );
  } catch (error) {
    notFound();
  }
}

// Statik parametreleri önceden oluştur
export async function generateStaticParams() {
  await dbConnect();
  const news = await News.find().select('_id');
  return news.map((item) => ({
    id: item._id.toString(),
  }));
} 