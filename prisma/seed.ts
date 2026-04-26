import { PrismaClient } from '@prisma/client';

// Karena menggunakan Driver Adapters (pg), inisialisasi prisma saat seeding harus mengikuti pola yang sama
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL is required');
}
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter } as any);

async function main() {
  console.log('Sedang mengisi data dummy...');

  // 1. Buat Kelas Pembelajaran
  const course1 = await prisma.course.create({
    data: {
      title: 'Pemrograman Web Dasar untuk Pemula',
      description: 'Belajar membuat website dari nol menggunakan HTML, CSS, dan JavaScript.',
      category: 'Teknologi',
      target: 'Tunarungu',
      thumbnail_url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
      instructor: 'Budi Santoso',
      duration: '2 jam',
      materials: {
        create: [
          {
            title: 'Pengenalan HTML',
            content_type: 'video',
            content: 'https://www.youtube.com/watch?v=kUMe1FH4CGY',
            order: 1,
          },
        ],
      },
    },
  });

  // 2. Buat Lowongan Pekerjaan
  const job1 = await prisma.job.create({
    data: {
      title: 'Frontend Developer',
      company: 'Tech Inklusi Nusantara',
      location: 'Jakarta (Remote)',
      category: 'IT',
      target: 'Daksa',
      description: 'Dicari frontend developer yang menguasai ReactJS dan bersedia bekerja secara remote.',
      requirements: '- Menguasai HTML, CSS, JS\n- Pengalaman ReactJS 1 tahun\n- Memiliki kemauan belajar yang tinggi',
      salary_range: 'Rp 5.000.000 - Rp 8.000.000',
    },
  });

  // 3. Buat Artikel
  const article1 = await prisma.article.create({
    data: {
      title: 'Pentingnya Ruang Kerja yang Inklusif',
      content: 'Ruang kerja yang inklusif bukan hanya soal memenuhi kuota, tetapi tentang menciptakan lingkungan di mana semua orang, termasuk penyandang disabilitas, dapat berinovasi bersama...',
      category: 'Karir',
      author: 'Admin SpaceDifabel',
      thumbnail_url: 'https://images.unsplash.com/photo-1573164713988-8665fc963095',
    },
  });

  console.log('✅ Berhasil mengisi data!');
  console.log({ course1, job1, article1 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
