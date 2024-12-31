'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const [news, setNews] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    category: '',
    imageUrl: '',
    author: ''
  });
  const [markdownData, setMarkdownData] = useState<null | {
    title: string;
    summary: string;
    content: string;
    category: string;
    imageUrl: string;
    author: string;
  }>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    const response = await fetch('/api/news');
    const data = await response.json();
    setNews(data);
  };

  const handleMarkdownUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsLoading(true);
    try {
      // Dosyayı oku
      const text = await file.text();
      
      // Markdown içeriğini parse et
      const frontMatterRegex = /^---[\r\n]+([\s\S]*?)[\r\n]+---[\r\n]+([\s\S]*)$/;
      const matches = text.match(frontMatterRegex);
      
      if (matches) {
        const [_, frontMatter, content] = matches;
        
        // Frontmatter'ı daha esnek bir şekilde parse et
        const metadata: Record<string, string> = {};
        frontMatter.split(/\r?\n/).forEach(line => {
          const colonIndex = line.indexOf(':');
          if (colonIndex !== -1) {
            const key = line.slice(0, colonIndex).trim();
            let value = line.slice(colonIndex + 1).trim();
            // Tırnak işaretlerini kaldır
            value = value.replace(/^["'](.*)["']$/, '$1');
            if (key && value) {
              metadata[key] = value;
            }
          }
        });

        console.log('Parsed metadata:', metadata); // Debug için

        // Markdown verisini state'e kaydet
        setMarkdownData({
          title: metadata.title || '',
          summary: metadata.summary || '',
          content: content.trim(),
          category: metadata.category || '',
          imageUrl: metadata.imageUrl || '',
          author: metadata.author || ''
        });

        alert('Markdown dosyası başarıyla yüklendi. Kontrol edip ekleyebilirsiniz.');
      } else {
        console.error('Markdown içeriği:', text); // Debug için
        alert('Geçersiz markdown formatı. Lütfen dosyanın doğru formatta olduğundan emin olun.');
      }
    } catch (error) {
      console.error('Dosya yükleme hatası:', error);
      alert('Dosya yüklenirken bir hata oluştu: ' + (error instanceof Error ? error.message : 'Bilinmeyen hata'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkdownSubmit = async () => {
    if (!markdownData) {
      alert('Lütfen önce bir markdown dosyası yükleyin.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(markdownData),
      });

      if (response.ok) {
        fetchNews();
        alert('Markdown dosyası başarıyla haber olarak eklendi');
        setMarkdownData(null); // Reset markdown data
      } else {
        const errorData = await response.json();
        alert(`Haber eklenirken bir hata oluştu: ${errorData.error || 'Bilinmeyen hata'}`);
      }
    } catch (error) {
      console.error('Haber ekleme hatası:', error);
      alert('Haber eklenirken bir hata oluştu: ' + (error instanceof Error ? error.message : 'Bilinmeyen hata'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          title: '',
          summary: '',
          content: '',
          category: '',
          imageUrl: '',
          author: ''
        });
        fetchNews();
        alert('Haber başarıyla eklendi');
      } else {
        alert('Haber eklenirken bir hata oluştu');
      }
    } catch (error) {
      console.error('Haber eklenirken hata:', error);
      alert('Haber eklenirken bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Bu haberi silmek istediğinizden emin misiniz?')) {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/news/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          fetchNews();
          alert('Haber başarıyla silindi');
        } else {
          alert('Haber silinirken bir hata oluştu');
        }
      } catch (error) {
        console.error('Haber silinirken hata:', error);
        alert('Haber silinirken bir hata oluştu');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-12 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
          Haber Yönetimi
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sol Taraf: Markdown Yükleme ve Haber Listesi */}
          <div className="space-y-8">
            {/* Markdown Dosyası Yükleme */}
            <div className="backdrop-blur-lg bg-gradient-to-br from-black/60 to-black/40 rounded-xl overflow-hidden shadow-2xl border border-white/10 hover:border-white/20 transition-all duration-300">
              <h2 className="text-2xl font-semibold p-6 border-b border-white/10 bg-black/40 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
                Markdown Dosyası ile Haber Ekle
              </h2>
              <div className="p-6 space-y-4">
                <div className="relative group">
                  <input
                    type="file"
                    accept=".md"
                    onChange={handleMarkdownUpload}
                    className="w-full p-3 rounded-lg bg-black/40 border border-white/5 focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/10 transition-all duration-300 text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-white/5 file:text-white/80 file:transition-all file:duration-300 file:hover:bg-white/10 cursor-pointer"
                    disabled={isLoading}
                  />
                </div>
                <p className="text-sm text-gray-500">
                  Markdown dosyasını seçin ve içeriğini kontrol ettikten sonra ekleyin.
                </p>
                {markdownData && (
                  <div className="mt-4 space-y-4">
                    <div className="p-4 bg-black/40 rounded-lg border border-white/5">
                      <h3 className="font-semibold text-white mb-2">{markdownData.title}</h3>
                      <p className="text-sm text-gray-400">{markdownData.summary}</p>
                      <div className="mt-2 flex flex-wrap gap-2 text-sm">
                        <span className="text-gray-500">Kategori: <span className="text-gray-400">{markdownData.category}</span></span>
                        <span className="text-gray-500">Yazar: <span className="text-gray-400">{markdownData.author}</span></span>
                      </div>
                    </div>
                    <button
                      onClick={handleMarkdownSubmit}
                      className="w-full bg-white/5 hover:bg-white/10 text-white py-3 px-4 rounded-lg backdrop-blur-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-white/10 hover:border-white/20 group relative overflow-hidden"
                      disabled={isLoading}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isLoading ? 'Ekleniyor...' : 'Haberi Ekle'}
                        {!isLoading && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        )}
                      </span>
                    </button>
                  </div>
                )}
                {isLoading && (
                  <div className="text-sm text-gray-400 animate-pulse flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    İşlem yapılıyor...
                  </div>
                )}
              </div>
            </div>

            {/* Haber Listesi */}
            <div className="backdrop-blur-lg bg-gradient-to-br from-zinc-900/60 to-black/40 rounded-xl overflow-hidden shadow-2xl border border-white/10 hover:border-white/20 transition-all duration-300">
              <h2 className="text-2xl font-semibold p-6 border-b border-white/10 bg-black/40 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
                Mevcut Haberler
              </h2>
              <div className="divide-y divide-white/10">
                {news.map((item: any) => (
                  <div key={item._id} className="p-6 hover:bg-white/10 transition-colors group">
                    <h3 className="font-semibold text-white group-hover:text-gray-200 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1 mb-2">{item.summary}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        {new Date(item.date).toLocaleDateString('tr-TR')}
                      </span>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-400 text-sm hover:text-red-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 group/delete"
                        disabled={isLoading}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover/delete:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Sil
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sağ Taraf: Manuel Haber Ekleme Formu */}
          <div className="backdrop-blur-lg bg-gradient-to-br from-zinc-800/40 to-black/40 rounded-xl overflow-hidden shadow-2xl border border-white/10 hover:border-white/20 transition-all duration-300">
            <h2 className="text-2xl font-semibold p-6 border-b border-white/10 bg-black/40 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
              Manuel Haber Ekleme
            </h2>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5 text-gray-300">Başlık</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-3 rounded-lg bg-black/60 border border-white/10 focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/10 transition-all duration-300 text-white placeholder-gray-500"
                  required
                  disabled={isLoading}
                  placeholder="Haber başlığını girin"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5 text-gray-300">Özet</label>
                <textarea
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full p-3 rounded-lg bg-black/60 border border-white/10 focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/10 transition-all duration-300 text-white placeholder-gray-500"
                  rows={2}
                  required
                  disabled={isLoading}
                  placeholder="Kısa bir özet yazın"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5 text-gray-300">İçerik (Markdown)</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full p-3 rounded-lg bg-black/60 border border-white/10 focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/10 transition-all duration-300 text-white placeholder-gray-500 font-mono text-sm"
                  rows={10}
                  required
                  disabled={isLoading}
                  placeholder="Markdown formatında içerik yazın"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5 text-gray-300">Kategori</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-3 rounded-lg bg-black/60 border border-white/10 focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/10 transition-all duration-300 text-white placeholder-gray-500"
                  required
                  disabled={isLoading}
                  placeholder="Kategori adını girin"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5 text-gray-300">Görsel URL</label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full p-3 rounded-lg bg-black/60 border border-white/10 focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/10 transition-all duration-300 text-white placeholder-gray-500"
                  required
                  disabled={isLoading}
                  placeholder="Görsel bağlantısını girin"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5 text-gray-300">Yazar</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full p-3 rounded-lg bg-black/60 border border-white/10 focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-white/10 transition-all duration-300 text-white placeholder-gray-500"
                  required
                  disabled={isLoading}
                  placeholder="Yazar adını girin"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-white/5 hover:bg-white/10 text-white py-3 px-4 rounded-lg backdrop-blur-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-white/10 hover:border-white/20 group relative overflow-hidden"
                disabled={isLoading}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isLoading ? 'İşlem yapılıyor...' : 'Haber Ekle'}
                  {!isLoading && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  )}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 