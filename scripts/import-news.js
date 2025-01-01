require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
const fs = require('fs').promises;
const path = require('path');
const matter = require('gray-matter');

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI ortam değişkeni tanımlanmamış.');
}

// Haber şeması
const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const News = mongoose.models.News || mongoose.model('News', newsSchema);

async function importNews() {
  try {
    // MongoDB'ye bağlan
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB bağlantısı başarılı');

    // Mevcut haberleri temizle
    await News.deleteMany({});
    console.log('Mevcut haberler temizlendi');

    // Haber dosyalarını oku
    const newsDirectory = path.join(process.cwd(), 'src/content/news');
    const files = await fs.readdir(newsDirectory);
    
    // Her markdown dosyasını işle
    for (const file of files) {
      if (!file.endsWith('.md')) continue;

      const filePath = path.join(newsDirectory, file);
      const fileContent = await fs.readFile(filePath, 'utf8');
      const { data, content } = matter(fileContent);

      // Haberi veritabanına ekle
      await News.create({
        title: data.title,
        summary: data.summary,
        content: content,
        category: data.category,
        imageUrl: data.imageUrl,
        author: data.author,
        date: new Date(data.date),
      });

      console.log(`${file} başarıyla import edildi`);
    }

    console.log('Tüm haberler başarıyla import edildi');
    process.exit(0);
  } catch (error) {
    console.error('Hata:', error);
    process.exit(1);
  }
}

importNews(); 