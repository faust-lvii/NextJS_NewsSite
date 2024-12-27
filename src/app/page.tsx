import { getAllNews } from "@/lib/news";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  const newsData = await getAllNews();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Haberler</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsData.map((news) => (
          <Link href={`/haber/${news.id}`} key={news.id} className="group">
            <article className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.02]">
              <div className="relative h-48 w-full">
                <Image
                  src={news.imageUrl}
                  alt={news.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-2">
                  {news.category}
                </span>
                <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {news.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {news.summary}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                  <time>{new Date(news.date).toLocaleDateString('tr-TR')}</time>
                  <span className="group-hover:underline">Devamını Oku →</span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
}
