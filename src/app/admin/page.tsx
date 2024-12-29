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
  const router = useRouter();

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    const response = await fetch('/api/news');
    const data = await response.json();
    setNews(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      }
    } catch (error) {
      console.error('Haber eklenirken hata:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Bu haberi silmek istediğinizden emin misiniz?')) {
      try {
        const response = await fetch(`/api/news/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          fetchNews();
        }
      } catch (error) {
        console.error('Haber silinirken hata:', error);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Haber Yönetimi</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Haber Ekleme Formu */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Yeni Haber Ekle</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Başlık</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-2 border rounded dark:bg-gray-700"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Özet</label>
              <textarea
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                className="w-full p-2 border rounded dark:bg-gray-700"
                rows={2}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">İçerik (Markdown)</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full p-2 border rounded dark:bg-gray-700"
                rows={10}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Kategori</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-2 border rounded dark:bg-gray-700"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Görsel URL</label>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="w-full p-2 border rounded dark:bg-gray-700"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Yazar</label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full p-2 border rounded dark:bg-gray-700"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
            >
              Haber Ekle
            </button>
          </form>
        </div>

        {/* Haber Listesi */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Mevcut Haberler</h2>
          <div className="space-y-4">
            {news.map((item: any) => (
              <div key={item._id} className="border-b pb-4">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{item.summary}</p>
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-600 text-sm hover:underline"
                  >
                    Sil
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 