# GG.news - Teknoloji Haber Portalı

Modern ve kullanıcı dostu bir teknoloji haber portalı. Next.js 13+, TypeScript, Tailwind CSS ve MongoDB kullanılarak geliştirilmiştir.

## 🚀 Özellikler

### 📱 Kullanıcı Arayüzü
- Modern ve responsive tasarım
- Kategori bazlı haber görüntüleme
- Canlı kripto para fiyatları takibi
- Gelişmiş arama fonksiyonu
- Dinamik haber detay sayfaları
- Markdown formatında içerik desteği

### 📂 Kategoriler
- Yapay Zeka
- Blockchain
- Mobil
- Yazılım
- Donanım

### 🛠️ Admin Paneli
- Güvenli admin girişi
- Haber ekleme/düzenleme/silme
- Markdown editör desteği
- Medya yönetimi

### 💻 Teknik Özellikler
- Server-side rendering
- API route'ları
- MongoDB entegrasyonu
- JWT bazlı kimlik doğrulama
- Responsive görüntü optimizasyonu
- SEO optimizasyonu

## 🔧 Kullanılan Teknolojiler

- **Frontend**: Next.js 13+, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, MongoDB
- **Veritabanı**: MongoDB Atlas
- **Kimlik Doğrulama**: JWT, bcrypt
- **İçerik**: Markdown, gray-matter
- **Deployment**: Vercel

## 🚀 Kurulum

1. Repoyu klonlayın:
\`\`\`bash
git clone https://github.com/faust-lvii/ggnews.git
\`\`\`

2. Bağımlılıkları yükleyin:
\`\`\`bash
npm install
\`\`\`

3. `.env.local` dosyasını oluşturun:
\`\`\`env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
\`\`\`

4. Geliştirme sunucusunu başlatın:
\`\`\`bash
npm run dev
\`\`\`

## 📝 Kullanım

### Admin Paneli
- `/admin/login` adresinden admin paneline giriş yapın
- Varsayılan kullanıcı adı: `admin`
- Varsayılan şifre: `admin123`

### Haber Ekleme
1. Admin paneline giriş yapın
2. "Yeni Haber Ekle" butonuna tıklayın
3. Markdown formatında içeriği girin
4. Gerekli meta bilgileri doldurun
5. Haberi yayınlayın

### API Kullanımı
- `GET /api/news`: Tüm haberleri listeler
- `GET /api/news/[id]`: Belirli bir haberin detaylarını getirir
- `GET /api/news/search?q=query`: Haberlerde arama yapar

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.