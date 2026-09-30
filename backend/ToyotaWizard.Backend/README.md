# Toyota Wizard - Enterprise .NET 8 Web API

Bu servis, **Toyota Türkiye Akıllı Model Seçim Sihirbazı** projesinin kurumsal C# .NET 8 Web API backend katmanıdır.

## 🏛 Mimari Yapı (Clean Architecture / N-Tier)

```
ToyotaWizard.Backend/
├── ToyotaWizard.sln                 # Visual Studio Çözüm Dosyası
└── src/
    └── ToyotaWizard.Api/             # Web API Projesi (.NET 8.0)
        ├── Controllers/              # REST API Uç Noktaları
        │   ├── WizardController.cs   # /api/wizard (Akış, eşleştirme, lead, analitik)
        │   ├── AuthController.cs     # /api/auth (JWT Admin Giriş & Doğrulama)
        │   └── AdminController.cs    # /api/admin (Yönetim Paneli CRUD & Metrikler)
        ├── Services/                 # İş Mantığı Katmanı
        │   ├── Interfaces/
        │   │   ├── IVehicleMatcherService.cs
        │   │   ├── IWizardService.cs
        │   │   └── ITokenService.cs
        │   └── Implementations/
        │       ├── VehicleMatcherService.cs # 100% Algoritmik Eşleştirme Motoru
        │       ├── WizardService.cs         # Akış, Lead ve Analitik Servisi
        │       └── TokenService.cs          # JWT Bearer Token Üretici
        ├── Models/                   # Veri Modelleri
        │   ├── Entities/             # EF Core Varlık Sınıfları (SQLite / SQL Server)
        │   │   ├── Question.cs       # Dinamik Soru ve Seçenekler
        │   │   ├── Category.cs       # İhtiyaç Balonları & Kurallar
        │   │   ├── Vehicle.cs        # Toyota Araç Kataloğu & Teknik Özellikler
        │   │   └── OtherEntities.cs  # Lead, WizardMetric, SiteSetting, AdminUser
        │   └── DTOs/                 # Veri Aktarım Nesneleri (Data Transfer Objects)
        ├── Data/                     # Veritabanı ve Tohumlama
        │   ├── ToyotaDbContext.cs    # Entity Framework Core DbContext
        │   └── DbInitializer.cs      # Otomatik Veritabanı Kurulumu & Seed Data
        ├── Middleware/               # Global Hata Yakalama ve Güvenlik
        │   └── ExceptionHandlingMiddleware.cs
        ├── appsettings.json          # Yapılandırma ve Bağlantı Dizgeleri
        └── Program.cs                # Dependency Injection, CORS, JWT & Pipeline
```

## 🚀 Çalıştırma

### Gereksinimler:
- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- Visual Studio 2022 (v17.8+) veya VS Code (C# Dev Kit)

### Terminal ile Çalıştırma:
```bash
cd backend/ToyotaWizard.Backend/src/ToyotaWizard.Api
dotnet restore
dotnet build
dotnet run
```

Uygulama varsayılan olarak `http://localhost:5001` portunda ayağa kalkar.
Swagger arayüzüne `http://localhost:5001/swagger` adresinden erişebilirsiniz.

### Admin Giriş Bilgileri:
- **Kullanıcı Adı**: `admin`
- **Şifre**: `Toyota2025!`
