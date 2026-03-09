# Sunucu / Build ayarları

Bu proje **Next.js 16** + **Prisma (SQLite)** kullanıyor. Aşağıdaki ayarlar Vercel, Railway, Render, VPS vb. için geçerlidir.

---

## Proje kökü (Root directory)

- **Root = `next-site`** (önerilen): Tüm komutlar doğrudan next-site içinde çalışır, `cd next-site` gerekmez.
- **Root = repo kökü:** Komutlarda `cd next-site &&` kullanılır.

---

## Build ayarları (Root = next-site)

Proje kökü **next-site** ise:

| Ayar | Değer |
|------|--------|
| **Framework Preset** | Next.js |
| **Node.js version** | `20` (veya `20.x`) |
| **Install command** | `npm ci` |
| **Build command** | `npx prisma generate && npm run build` |
| **Start / Run command** | `npm run start` |
| **Output directory** | *(boş bırakın)* |

---

## Build ayarları (Root = repo kökü)

Root boş veya `.` ise:

| Ayar | Değer |
|------|--------|
| **Install command** | `cd next-site && npm ci` |
| **Build command** | `cd next-site && npx prisma generate && npm run build` |
| **Start / Run command** | `cd next-site && npm run start` |

---

## Ortam değişkenleri (Environment variables)

| Değişken | Zorunlu | Açıklama |
|----------|---------|----------|
| `DATABASE_URL` | Hayır* | Prisma veritabanı URL’i. Varsayılan: `file:./prisma/dev.db` (veya container’da `file:./data/dev.db`). |
| `NEXT_PUBLIC_SITE_URL` | Hayır | Site adresi (sitemap vb.). Varsayılan: `https://dogukanatabay.com` |

\* SQLite kullanıyorsanız genelde varsayılan path yeterli; farklı bir path kullanacaksanız `DATABASE_URL` tanımlayın.

---

## Önemli notlar

1. **SQLite + serverless:** Vercel gibi **serverless** ortamlarda dosya sistemi kalıcı değildir; SQLite production için uygun olmayabilir. Bu proje **VPS, Docker, Railway, Render (VM)** gibi kalıcı disk olan ortamlara daha uygun.
2. **Prisma:** Build sırasında `prisma generate` mutlaka çalışmalı (yukarıdaki build komutunda var).
3. **Port:** Çoğu platform `PORT` ortam değişkeni verir; Next.js bunu otomatik kullanır. Lokal/Docker’da varsayılan 3000.

---

## Örnek (Railway / Render / VPS)

```bash
# Build
cd next-site && npx prisma generate && npm run build

# Start
cd next-site && npm run start
```

**Vercel** kullanıyorsanız Root Directory’yi `next-site` yapıp Build Command’ı `npx prisma generate && npm run build`, Output Directory’yi boş bırakın. Production’da SQLite yerine Vercel Postgres veya harici bir DB kullanmanız önerilir.
