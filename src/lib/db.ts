import mongoose from 'mongoose';

// MongoDB URI'sini type assertion ile string olarak belirtiyoruz
const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

interface Connection {
  isConnected?: number;
}

const connection: Connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  try {
    const db = await mongoose.connect(MONGODB_URI);
    connection.isConnected = db.connections[0].readyState;
    console.log('MongoDB bağlantısı başarılı');
  } catch (error) {
    console.error('MongoDB bağlantı hatası:', error);
    throw error;
  }
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

// Kullanıcı şeması
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Model tanımlamaları
const News = mongoose.models.News || mongoose.model('News', newsSchema);
const User = mongoose.models.User || mongoose.model('User', userSchema);

export { dbConnect as default, News, User }; 