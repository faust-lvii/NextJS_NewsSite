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
      <>
        {/* Header */}
        <header className="bg-[#0a0a0a] border-b border-white/10">
          <div className="container mx-auto px-4">
            <nav className="flex items-center justify-between h-16">
              <Link href="/" className="text-2xl font-bold text-white">
                GG<span className="text-blue-500">.news</span>
              </Link>
              <div className="flex space-x-6">
                <Link href="/kategori/yapay-zeka" className="text-gray-300 hover:text-white transition-colors">Yapay Zeka</Link>
                <Link href="/kategori/blockchain" className="text-gray-300 hover:text-white transition-colors">Blockchain</Link>
                <Link href="/kategori/mobil" className="text-gray-300 hover:text-white transition-colors">Mobil</Link>
                <Link href="/kategori/yazilim" className="text-gray-300 hover:text-white transition-colors">Yazılım</Link>
                <Link href="/kategori/donanim" className="text-gray-300 hover:text-white transition-colors">Donanım</Link>
              </div>
              <div className="relative">
                <input
                  type="search"
                  placeholder="Haberlerde ara..."
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-transparent w-64"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute right-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </nav>
          </div>
        </header>

        <main className="min-h-screen bg-[#0a0a0a] text-white py-12 px-4">
          <div className="container mx-auto">
            <Link
              href="/"
              className="inline-flex items-center text-gray-400 hover:text-blue-400 transition-colors mb-8 group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Ana Sayfaya Dön
            </Link>
            <article className="max-w-4xl mx-auto backdrop-blur-lg bg-white/5 rounded-xl shadow-2xl border border-white/10">
              <header className="p-8 border-b border-white/10">
                <span className="inline-block px-3 py-1 text-sm font-semibold bg-blue-500/20 text-blue-400 rounded-full mb-4 border border-blue-500/20">
                  {news.category}
                </span>
                <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-blue-400">
                  {news.title}
                </h1>
                <div className="flex items-center gap-4 text-gray-400">
                  {news.author && <span>Yazar: {news.author}</span>}
                  <span>•</span>
                  <time>{new Date(news.date).toLocaleDateString('tr-TR')}</time>
                </div>
              </header>
              <div className="relative h-[500px] w-full border-b border-white/10 overflow-hidden">
                <Image
                  src={news.imageUrl}
                  alt={news.title}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60" />
              </div>
              <div className="p-8">
                <div className="prose prose-lg prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-white prose-strong:text-white prose-a:text-blue-400 hover:prose-a:text-blue-300 prose-blockquote:border-blue-500 prose-pre:bg-black/40">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {news.content}
                  </ReactMarkdown>
                </div>
              </div>
            </article>
          </div>
        </main>
      </>
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