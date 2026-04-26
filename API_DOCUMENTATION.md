# SpaceDifabel API Documentation

**Base URL:** `https://spacedifable-backend-production.up.railway.app`

Dokumen ini berisi daftar endpoint API backend SpaceDifabel yang digunakan oleh Frontend Developer.

---

## 📌 Standard Response Format
Setiap endpoint API mengikuti format standar JSON untuk *Success* dan *Error*.

**Success Response (2xx):**
```json
{
  "status": "success",
  "data": {
    // response data
  }
}
```

**Error Response (4xx, 5xx):**
```json
{
  "status": "error",
  "message": "Pesan error"
}
```

---

## 🔐 1. Authentication

### A. Register Akun Baru
Mendaftarkan user baru ke sistem.
- **Endpoint:** `POST /auth/register`
- **Body (JSON):**
  ```json
  {
    "name": "Budi Santoso",
    "email": "budi@example.com",
    "password": "secretpassword",
    "disability_type": "Tunarungu"
  }
  ```

### B. Login
Mendapatkan token JWT untuk mengakses endpoint terproteksi.
- **Endpoint:** `POST /auth/login`
- **Body (JSON):**
  ```json
  {
    "email": "budi@example.com",
    "password": "secretpassword"
  }
  ```
- **Response Data:**
  ```json
  {
    "access_token": "eyJhbG...",
    "user": {
      "id": "uuid",
      "name": "Budi Santoso",
      "email": "budi@example.com",
      "disability_type": "Tunarungu"
    }
  }
  ```

### C. Get Current User Profile (Protected)
Mengambil detail user yang sedang login.
- **Endpoint:** `GET /auth/me`
- **Headers:** `Authorization: Bearer <access_token>`

---

## 📚 2. Courses (Kelas Pembelajaran)

### A. Get All Courses
Menampilkan daftar kelas, mendukung *query params* untuk pencarian & filter.
- **Endpoint:** `GET /courses`
- **Query Params (Opsional):**
  - `search` (string) - Mencari berdasarkan judul kelas.
  - `category` (string) - Filter berdasarkan kategori.
  - `target` (string) - Filter berdasarkan target disabilitas (contoh: "Tunarungu").

### B. Get Course Detail
Menampilkan detail satu kelas beserta deskripsinya.
- **Endpoint:** `GET /courses/:id`

### C. Get Course Materials (Protected)
Mendapatkan materi belajar (video/modul) untuk kelas tertentu. Memerlukan autentikasi.
- **Endpoint:** `GET /courses/:id/learn`
- **Headers:** `Authorization: Bearer <access_token>`

---

## 💼 3. Jobs (Lowongan Pekerjaan)

### A. Get All Jobs
Menampilkan daftar lowongan pekerjaan.
- **Endpoint:** `GET /jobs`
- **Query Params (Opsional):**
  - `search` (string) - Mencari berdasarkan posisi / company.
  - `category` (string) - Filter kategori (misal: "IT", "Design").
  - `target` (string) - Filter target pekerja.

### B. Get Job Detail
Menampilkan detail sebuah lowongan pekerjaan.
- **Endpoint:** `GET /jobs/:id`

### C. Apply Job (Protected)
Melamar ke sebuah lowongan pekerjaan dengan mengunggah file CV (PDF).
- **Endpoint:** `POST /jobs/:id/apply`
- **Headers:** `Authorization: Bearer <access_token>`
- **Content-Type:** `multipart/form-data`
- **Body / Form-Data:**
  - `cv_file` (File) - File dokumen (diwajibkan file PDF, DOCX, dll).

> 💡 **Catatan:** Backend akan otomatis mengunggah file CV ke sistem cloud storage (Supabase) dan menyimpan URL publiknya di database.

---

## 📰 4. Articles (Artikel)

### A. Get All Articles
Menampilkan daftar artikel inklusif.
- **Endpoint:** `GET /articles`
- **Query Params (Opsional):**
  - `search` (string) - Mencari dari judul atau isi artikel.
  - `category` (string) - Filter artikel.

### B. Get Article Detail
Menampilkan detail konten dari sebuah artikel.
- **Endpoint:** `GET /articles/:id`

---

## 🔧 Panduan Autentikasi untuk Frontend
Setiap kali user melakukan *Login*, simpan nilai `access_token` ke dalam LocalStorage / Cookies. Untuk mengakses endpoint berlabel **(Protected)**, tambahkan header berikut pada setiap request `fetch` atau `axios`:

```javascript
headers: {
  "Authorization": "Bearer <isi_access_token_disini>"
}
```
