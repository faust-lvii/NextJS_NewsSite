import { News } from "@/lib/db";
import dbConnect from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    kategori: string;
  };
}

export default async function KategoriPage({ params }: PageProps) {
  try {
    await dbConnect();
    
    // Kategori adını düzgün formata çevirme
    const kategoriMap: { [key: string]: string } = {
      'yapay-zeka': 'Yapay Zeka',
      'blockchain': 'Blockchain',
      'mobil': 'Mobil',
      'yazilim': 'Yazılım',
      'donanim': 'Donanım'
    };

    const kategoriAdi = kategoriMap[params.kategori];
    if (!kategoriAdi) {
      notFound();
    }

    const haberler = await News.find({ category: kategoriAdi }).sort({ date: -1 });

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
            <div className="flex items-center justify-between mb-12">
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-blue-400">
                {kategoriAdi} Haberleri
              </h1>
              <Link
                href="/"
                className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2 group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Ana Sayfaya Dön
              </Link>
            </div>

            {/* Haberler Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {haberler.map((haber: any) => (
                <Link href={`/haber/${haber._id}`} key={haber._id} className="group">
                  <article className="backdrop-blur-lg bg-white/5 rounded-xl overflow-hidden shadow-2xl border border-white/10 hover:border-blue-500/30 transition-all duration-300 hover:transform hover:scale-[1.02]">
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={haber.imageUrl}
                        alt={haber.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                    </div>
                    <div className="p-6 relative">
                      <span className="inline-block px-3 py-1 text-sm font-semibold bg-blue-500/20 text-blue-400 rounded-full mb-3 border border-blue-500/20">
                        {haber.category}
                      </span>
                      <h2 className="text-xl font-semibold mb-3 text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                        {haber.title}
                      </h2>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {haber.summary}
                      </p>
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <time>
                          {new Date(haber.date).toLocaleDateString('tr-TR')}
                        </time>
                        <span className="group-hover:text-blue-400 transition-colors flex items-center gap-1">
                          Devamını Oku 
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </main>
      </>
    );
  } catch (error) {
    console.error('Kategori sayfası hatası:', error);
    notFound();
  }
} 