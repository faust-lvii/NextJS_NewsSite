# GG.news - Teknoloji Haber Portalı:  Geleceğin Haberlerini Bugünden Okuyun!

Modern ve kullanıcı dostu bir teknoloji haber portalı. Next.js 13+, TypeScript, Tailwind CSS ve MongoDB kullanılarak geliştirilmiştir.  [Projenin ekran görüntüsünü buraya ekleyin]

## 🚀 Özellikler

### ✨ Çarpıcı ve Kullanıcı Dostu Arayüz
- Modern ve responsive tasarım (her cihazda mükemmel görüntüleme)
- Kategori bazlı haber görüntüleme (kolayca istediğiniz konuları bulun)
- Canlı kripto para fiyatları takibi (anlık piyasa verileri)
- Gelişmiş arama fonksiyonu (hızlı ve kolay haber arama)
- Dinamik haber detay sayfaları (detaylı ve zengin içerik)
- Markdown formatında içerik desteği (esnek ve zengin içerik oluşturma)

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
- **Server-side rendering (SSR):**  Hızlı yükleme süreleri ve SEO optimizasyonu için.
- **API route'ları:**  Verimli ve ölçeklenebilir bir API mimarisi.
- **MongoDB entegrasyonu:**  Esnek ve ölçeklenebilir bir veritabanı çözümü.  (MongoDB Atlas kullanımı önerilir)
- **JWT bazlı kimlik doğrulama:**  Güvenli ve güvenilir kullanıcı kimlik doğrulaması.
- **Responsive görüntü optimizasyonu:**  Her cihazda mükemmel görüntü kalitesi.
- **SEO optimizasyonu:**  Arama motorlarında üst sıralarda yer almak için optimize edilmiştir.

## 🔧 Kullanılan Teknolojiler

- **Frontend**: Next.js 13+, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, MongoDB
- **Veritabanı**: MongoDB Atlas
- **Kimlik Doğrulama**: JWT, bcrypt
- **İçerik**: Markdown, gray-matter
- **Deployment**: Vercel

## 🚀 Kurulum

1. **Repoyu klonlayın:**
   ```bash
   git clone https://github.com/faust-lvii/ggnews.git
   ```

2. **Bağımlılıkları yükleyin:**
   ```bash
   npm install
   ```

3. **`.env.local` dosyasını oluşturun:**  [MongoDB Atlas'tan](https://www.mongodb.com/cloud/atlas) bir `MONGODB_URI` oluşturun ve `JWT_SECRET` için güçlü bir şifre belirleyin.
   ```env
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

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

## 📄 Katkıda Bulunma

Projemize katkıda bulunmak isterseniz, lütfen [katkıda bulunma kılavuzumuza](CONTRIBUTING.md) bakın.

## 📄 Lisans

Bu proje [MIT Lisansı](LICENSE) altında lisanslanmıştır.