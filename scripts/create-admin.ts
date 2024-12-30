import bcrypt from 'bcryptjs';
import { User } from '../src/lib/db';
import dbConnect from '../src/lib/db';

async function createAdmin() {
  try {
    await dbConnect();

    // Şifreyi hashle
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    // Admin kullanıcısını oluştur
    const admin = await User.create({
      username: 'admin',
      password: hashedPassword,
    });

    console.log('Admin kullanıcısı oluşturuldu:', admin);
    process.exit(0);
  } catch (error) {
    console.error('Hata:', error);
    process.exit(1);
  }
}

createAdmin(); 