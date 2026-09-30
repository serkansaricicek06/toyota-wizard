# 🚗 Toyota Akıllı Model Seçim Sihirbazı
## Kurumsal Kurulum ve Kullanım Kılavuzu

Bu proje, Toyota Türkiye için geliştirilmiş; müşterilerin kullanım amacı, kişi sayısı, yaşam tarzı ve spesifik donanım tercihlerine göre en ideal Toyota modelini belirleyen **kurumsal ölçekli bir web uygulamasıdır**.

---

### 🏛️ Mimari ve Teknoloji Yığını

* **Frontend:** **Next.js 16 (App Router)**
* **CSS / Tasarım:** **Tailwind CSS & Modern CSS** (Toyota Brand Book & Figma Design Tokens uyumlu)
* **Backend:** **.NET 8 (ASP.NET Core Web API - C#)**
* **Veritabanı Katmanı:** **SQL** (Entity Framework Core 8 ile SQLite / MS SQL Server / PostgreSQL tam uyumlu)
* **API Entegrasyonu & CDN:** Toyota Europe CCIS (Cardb) 3D Studio Image Optimization Service

---

### 📁 Kurumsal Proje Dizin Yapısı

```text
filtre_fronted/
├── app/                                  # 🌐 Next.js 16 App Router Katmanı
│   ├── layout.jsx                        # Kök Şablon, SEO Meta Etiketleri & İkonlar
│   ├── globals.css                       # Tailwind Direktifleri + Kurumsal Animasyonlar
│   ├── page.jsx                          # Ana Sihirbaz Ekranı (Client Component)
│   └── admin/
│       └── [[...slug]]/page.jsx          # Yönetim Paneli Sayfası (/admin, /admin/vehicles vb.)
├── backend/                              # 🏢 Kurumsal .NET 8 Web API Çözümü
│   └── ToyotaWizard.Backend/
│       ├── ToyotaWizard.sln              # Visual Studio Solution Dosyası
│       ├── README.md                     # .NET Özel Mimari Açıklaması
│       └── src/ToyotaWizard.Api/
│           ├── Controllers/              # Wizard, Auth ve Admin API Denetleyicileri
│           ├── Services/                 # Matcher, Wizard ve Token İş Mantığı
│           ├── Models/                   # Entities (EF Core) ve Strongly-Typed DTOs
│           ├── Data/                     # DbContext ve Otomatik Veri Tohumlama (DbInitializer)
│           ├── Middleware/               # Global Hata Yakalama (Exception Handling)
│           ├── appsettings.json          # Veritabanı ve JWT Yapılandırması
│           └── Program.cs                # Dependency Injection, JWT & CORS Pipeline
├── docs/                                 # 📚 Kurumsal Dokümantasyon & Şartnameler
│   └── references/                       # Orijinal Binek ve Ticari Excel Şartnameleri
├── public/                               # 🖼️ Statik Varlıklar
│   ├── official_figma_toyota_logo.svg    # Resmi Toyota Logo Vektörü
│   ├── toyota_real_logo.svg              # Alternatif Logo Referansı
│   └── robots.txt                        # Arama Motoru İndeksleme Kuralları
├── scripts/                              # 🛠️ Veritabanı Betikleri
│   └── schema_and_seed.sql               # Bağımsız ANSI SQL Şema ve Başlangıç Verileri
├── src/                                  # 🎨 React Bileşenleri ve Arayüz Sistemi
│   ├── components/                       # Adım Ekranları, Filtre Balonları, Admin Paneli
│   ├── data/                             # Araç Kataloğu ve Soru Veri Modelleri
│   └── services/                         # İstemci API Entegrasyon Servisi (api.js)
├── tailwind.config.js                    # Toyota Kurumsal Renk Paleti ve Jetonları
├── next.config.mjs                       # Next.js Konfigürasyonu (Backend Proxy & İzinler)
├── package.json                          # Frontend Bağımlılıkları ve Çalıştırma Komutları
└── KULLANIM_KILAVUZU.md                  # Bu Belge
```

---

### 🚀 Hızlı Başlangıç (Nasıl Çalıştırılır?)

#### 1. Gereksinimler
- **Node.js**: v18.0.0 veya üzeri (v20+ önerilir)
- **.NET SDK**: [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)

---

#### 2. Çalıştırma Adımları

##### 🔹 Adım 1: .NET 8 Backend'i Başlatın
```bash
cd backend/ToyotaWizard.Backend/src/ToyotaWizard.Api
dotnet restore
dotnet run
```
* Backend varsayılan olarak `http://localhost:5000` portunda ayağa kalkar.
* Swagger test dokümantasyonu: `http://localhost:5000/swagger`

##### 🔹 Adım 2: Next.js Frontend'i Başlatın
Ana proje dizininde (`filtre_fronted/`):
```bash
npm install
npm run dev
```
* Frontend `http://localhost:3000` adresinde açılır.
* `next.config.mjs` içindeki proxy kuralı sayesinde tüm `/api/*` istekleri arka planda doğrudan .NET Web API'ye yönlendirilir.

---

### 🗄️ Veritabanı ve Tohumlama (Database & Seeding)

1. **Otomatik Tohumlama:** .NET Backend ilk ayağa kalktığında `DbInitializer.cs` devreye girerek veritabanını, tabloları, varsayılan admin kullanıcısını ve tüm Toyota modellerini, soruları ve kuralları otomatik oluşturur.
2. **Ham SQL İle Kurulum (DBA için):** Kurumsal veritabanı yöneticiniz veritabanını doğrudan MS SQL Server, PostgreSQL veya SQLite üzerinde yönetmek isterse, `scripts/schema_and_seed.sql` dosyasını doğrudan çalıştırabilir.

---

### 🔐 Yönetim Paneli (Admin Portal)

Uygulamanın tüm dinamik ayarları, soru havuzu, araç kataloğu ve müşteri talepleri yönetim panelinden kontrol edilir.

- **Erişim Adresi**: `http://localhost:3000/admin` veya `http://localhost:3000/admin/vehicles`
- **Kullanıcı Adı**: `admin`
- **Şifre**: `Admin!Toyota2025`

#### Yönetim Paneli Özellikleri:
1. **Dinamik Soru & Seçenek Yönetimi**: Soruların sıralamasını, başlıklarını ve binek/ticari etiketlerini değiştirme.
2. **İhtiyaç Balonları (Kategoriler)**: 23 adet filtre balonunu, ikonlarını, renklerini ve alt seçeneklerini düzenleme.
3. **Araç Kataloğu**: 16 Toyota modelinin fiyatlarını, donanım etiketlerini ve görsel bağlantılarını güncelleme.
4. **Görsel Eşleştirme Matrisi**: Hangi tercihin hangi araca kaç puan kazandıracağını canlı matris üzerinden ayarlama.
5. **Müşteri Talepleri (Leads)**: Kullanıcıların bıraktığı iletişim bilgilerini ve eşleşen araçları görüntüleme / durum güncelleme.
6. **Dönüşüm Hunisi (Funnel) & Analitik**: Kullanıcıların hangi adımda ne kadar vakit geçirdiğini ve nerede ayrıldığını gösteren analitik motoru.
7. **Tema & SEO Yönetimi**: Başlık, açıklama, duyuru bandı ve renk ayarlarını kod yazmadan değiştirme.

---

### 🛡️ Binek ve Ticari İzolasyon Mantığı

Sistem, binek ve ticari araç arayan kullanıcıları ilk andan itibaren kesin çizgilerle ayırır:

| Kullanıcı Seçimi | Karşılaşılan Sorular | Karşılaşılan Balonlar | Eşleşen Araç Havuzu |
| :--- | :--- | :--- | :--- |
| **Binek Araç** | 4 Adet (Kullanım amacı, kişi sayısı, yaşam tarzı, sürüş alışkanlığı) | 12 Adet (Dar alanda park, 4x4, uzun yol konforu, arka koltuk, kış paketi vb.) | Corolla, Yaris, C-HR, Corolla Cross, RAV4, Camry, Land Cruiser |
| **Ticari Araç** | 2 Adet (Kullanım amacı, iş kolu alanı - Dağıtım/Servis/Yolcu/vb.) | 11 Adet (Yükleme kolaylığı, europalet, 1 ton istiap, araç içi priz vb.) | Proace City, Proace City Verso, Proace Cargo, Proace Verso, Proace Max, Hilux |

---

### 📦 Canlı Ortam Dağıtımı (Production Build)

#### Frontend Prod Build:
```bash
npm run build
npm run start
```

#### .NET 8 Backend Prod Publish:
```bash
cd backend/ToyotaWizard.Backend/src/ToyotaWizard.Api
dotnet publish -c Release -o ./publish
```
*Elde edilen `./publish` çıktısı IIS, Docker container veya Linux/Windows sunucularda doğrudan host edilebilir.*
