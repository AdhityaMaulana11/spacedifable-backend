<div align="center">
  <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=400" alt="SpaceDifabel Banner" width="400"/>
  <h1>🌟 SpaceDifabel Backend API</h1>
  <p><strong>Membangun Ruang Karir & Pembelajaran yang Inklusif bagi Penyandang Disabilitas</strong></p>
  <p><em>Proyek IO Fest UNTAR 2026</em></p>
</div>

---

## 📖 Tentang Projek
**SpaceDifabel** adalah sebuah platform inklusif yang dirancang untuk memberdayakan penyandang disabilitas melalui akses kelas pembelajaran (*courses*) dan peluang kerja (*jobs*) yang dirancang khusus untuk mereka.

Repositori ini adalah sistem **Backend API** yang menangani logika inti, manajemen *database*, autentikasi pengguna, hingga integrasi *cloud storage* untuk pengunggahan *Curriculum Vitae* (CV).

## 🚀 Teknologi yang Digunakan
Backend ini dibangun menggunakan *stack* teknologi modern yang difokuskan pada skalabilitas dan keamanan tinggi:
- **[NestJS v11](https://nestjs.com/)** - Framework Node.js tangguh untuk arsitektur yang sangat terstruktur.
- **[Prisma ORM v7](https://www.prisma.io/)** - ORM modern (*Driver Adapters*) untuk manipulasi *database* dengan Type-Safety.
- **[Supabase PostgreSQL](https://supabase.com/)** - Layanan *database* *Cloud* yang aman dan terdistribusi.
- **[Supabase Storage](https://supabase.com/docs/guides/storage)** - Digunakan untuk manajemen *upload* file CV *multipart/form-data*.
- **[JWT & Passport](https://jwt.io/)** - Untuk sistem Autentikasi dan Proteksi Akses (Autentikasi Bearer Token).

## 🌐 Live API Endpoint (Production)
Aplikasi ini sudah di-deploy dan berjalan 24/7 di:
👉 **[https://spacedifable-backend-production.up.railway.app](https://spacedifable-backend-production.up.railway.app)**

*Untuk dokumentasi rute (endpoints) yang lebih lengkap bagi tim Frontend, silakan baca file [`API_DOCUMENTATION.md`](./API_DOCUMENTATION.md) di repositori ini.*

---

## 💻 Cara Menjalankan di Komputer Lokal

### 1. Prasyarat
Pastikan komputermu sudah ter-install:
- [Node.js](https://nodejs.org/) (Versi 20.x ke atas)
- [Git](https://git-scm.com/)

### 2. Instalasi
Clone repository ini dan install *dependencies*:
```bash
git clone https://github.com/AdhityaMaulana11/spacedifable-backend.git
cd spacedifable-backend
npm install
```

### 3. Konfigurasi Lingkungan (Environment)
Buat file bernama `.env` dari `.env.example`:
```bash
cp .env.example .env
```
Lalu isi variabel-variabel di dalamnya:
- `DATABASE_URL`: String koneksi PostgreSQL Supabase (Pastikan *password* di-URL Encode).
- `JWT_SECRET`: Kunci rahasia untuk pembuatan token.
- `SUPABASE_...`: Kredensial khusus untuk koneksi ke Storage (CV File Upload).

### 4. Setup Database & Seeding
Sinkronisasikan struktur *database* ke server Supabase dan jalankan data awal (dummy):
```bash
npx prisma db push
npx prisma db seed
```

### 5. Jalankan Server
```bash
# Mode Development
npm run start:dev
```
Server lokal akan berjalan di `http://localhost:3000`.

---

## 🛠️ Tim Pengembang
Dikembangkan dengan sepenuh hati ❤️ untuk kompetisi **IO Fest UNTAR 2026**.
