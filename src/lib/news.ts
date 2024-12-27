import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { NewsItem } from '@/types/news';

const newsDirectory = path.join(process.cwd(), 'src/content/news');

const getSlugFromId = (id: string) => {
  const slugMap: { [key: string]: string } = {
    "1": "yapay-zeka-teknolojisi",
    "2": "surdurulebilir-enerji",
    "3": "uzay-turizmi",
    "4": "elektrikli-araclar",
    "5": "yapay-et",
    "6": "kuantum-bilgisayar",
    "7": "mars-kolonisi",
    "8": "yapay-organ",
    "9": "metaverse-egitim"
  };
  return slugMap[id] || id;
};

export async function getAllNews(): Promise<NewsItem[]> {
  const fileNames = await fs.readdir(newsDirectory);
  const allNews = await Promise.all(
    fileNames.map(async (fileName) => {
      const fileContent = await fs.readFile(path.join(newsDirectory, fileName), 'utf8');
      const { data } = matter(fileContent);
      return {
        id: data.id,
        title: data.title,
        summary: data.summary,
        date: data.date,
        category: data.category,
        imageUrl: data.imageUrl,
        author: data.author,
      } as NewsItem;
    })
  );

  // Tarihe göre sırala (en yeni en üstte)
  return allNews.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getNewsById(id: string): Promise<NewsItem> {
  try {
    const slug = getSlugFromId(id);
    const fullPath = path.join(newsDirectory, `${slug}.md`);
    const fileContents = await fs.readFile(fullPath, 'utf8');

    const { data, content } = matter(fileContents);

    return {
      id: data.id,
      title: data.title,
      summary: data.summary,
      content: content,
      date: data.date,
      category: data.category,
      imageUrl: data.imageUrl,
      author: data.author,
    };
  } catch (error) {
    throw new Error(`Haber bulunamadı: ${id}`);
  }
} 