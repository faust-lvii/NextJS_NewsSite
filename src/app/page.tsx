'use client';
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from 'react';
import CryptoScoreboard from './components/CryptoScoreboard';

interface CryptoPrice {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
}

interface NewsItem {
  _id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  imageUrl: string;
  author: string;
  date: string;
}

export default function Home() {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchData();
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`/api/news/search?q=${encodeURIComponent(searchQuery)}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setNewsData(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Arama hatası:', error);
      setNewsData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/news');
      console.log('API yanıt durumu:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Yüklenen haber sayısı:', Array.isArray(data) ? data.length : 0);
      
      setNewsData(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Veri çekme hatası:', error);
      setNewsData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Eğer newsData boşsa veya array değilse, boş bir içerik göster
  if (!Array.isArray(newsData) || newsData.length === 0) {
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
                <div className="relative group">
                  <button className="text-gray-300 hover:text-white transition-colors flex items-center gap-1">
                    Tüm Kategoriler
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex-1 max-w-xs mx-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Haberlerde ara..."
                    className="w-full px-4 py-1.5 bg-[#1a1a1a] border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 text-white text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSearch();
                      }
                    }}
                  />
                  <button
                    onClick={handleSearch}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </nav>
          </div>
        </header>

        <main className="min-h-screen bg-[#0a0a0a] text-white py-12 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sol taraf: Kripto Skorboard */}
              <div className="lg:col-span-1">
                <CryptoScoreboard />
              </div>
              
              {/* Sağ taraf: Haberler */}
              <div className="lg:col-span-3">
                <h1 className="text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300">
                  Teknoloji Haberleri
                </h1>
                <div className="text-center text-gray-400">
                  Henüz haber bulunmuyor...
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    );
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
              <div className="relative group">
                <button className="text-gray-300 hover:text-white transition-colors flex items-center gap-1">
                  Tüm Kategoriler
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex-1 max-w-xs mx-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Haberlerde ara..."
                  className="w-full px-4 py-1.5 bg-[#1a1a1a] border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 text-white text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch();
                    }
                  }}
                />
                <button
                  onClick={handleSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-screen bg-[#0a0a0a] text-white py-12 px-4">
        <div className="container mx-auto">
          <h1 className="text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300">
            Teknoloji Haberleri
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sol taraf: Kripto Skorboard */}
            <div className="lg:col-span-1 h-[500px]">
              <CryptoScoreboard />
            </div>
            
            {/* Sağ taraf: Haberler */}
            <div className="lg:col-span-3">
              {/* Featured News */}
              {newsData[0] && (
                <Link href={`/haber/${newsData[0]._id}`} className="block mb-12 group">
                  <div className="relative h-[500px] w-full rounded-2xl overflow-hidden">
                    <Image
                      src={newsData[0].imageUrl}
                      alt={newsData[0].title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <span className="inline-block px-3 py-1 text-sm font-semibold bg-blue-500/90 text-white rounded-full mb-4">
                        {newsData[0].category}
                      </span>
                      <h2 className="text-4xl font-bold mb-4 text-white group-hover:text-blue-300 transition-colors">
                        {newsData[0].title}
                      </h2>
                      <p className="text-lg text-gray-300 mb-4 line-clamp-2">
                        {newsData[0].summary}
                      </p>
                      <div className="flex items-center text-sm text-gray-400">
                        <span>{newsData[0].author}</span>
                        <span className="mx-2">•</span>
                        <time>{new Date(newsData[0].date).toLocaleDateString('tr-TR')}</time>
                      </div>
                    </div>
                  </div>
                </Link>
              )}

              {/* News Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {newsData.slice(1).map((news) => (
                  <Link href={`/haber/${news._id}`} key={news._id} className="group">
                    <article className="backdrop-blur-lg bg-white/5 rounded-xl overflow-hidden shadow-2xl border border-white/10 hover:border-blue-500/30 transition-all duration-300 hover:transform hover:scale-[1.02]">
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={news.imageUrl}
                          alt={news.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                      </div>
                      <div className="p-6 relative">
                        <span className="inline-block px-3 py-1 text-sm font-semibold bg-blue-500/20 text-blue-400 rounded-full mb-3 border border-blue-500/20">
                          {news.category}
                        </span>
                        <h2 className="text-xl font-semibold mb-3 text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                          {news.title}
                        </h2>
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                          {news.summary}
                        </p>
                        <div className="flex justify-between items-center text-sm text-gray-500">
                          <time>
                            {new Date(news.date).toLocaleDateString('tr-TR')}
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
          </div>
        </div>
      </main>
    </>
  );
}
