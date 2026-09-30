using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using ToyotaWizard.Api.Models.Entities;

namespace ToyotaWizard.Api.Data;

public static class DbInitializer
{
    public static async Task InitializeAsync(ToyotaDbContext context)
    {
        await context.Database.EnsureCreatedAsync();

        // Ensure schema upgrades for new columns
        try { await context.Database.ExecuteSqlRawAsync("ALTER TABLE AdminUsers ADD COLUMN FullName TEXT DEFAULT '';"); } catch { }
        try { await context.Database.ExecuteSqlRawAsync("ALTER TABLE AdminUsers ADD COLUMN IsActive INTEGER DEFAULT 1;"); } catch { }
        try { await context.Database.ExecuteSqlRawAsync("ALTER TABLE Vehicles ADD COLUMN Tagline TEXT DEFAULT '';"); } catch { }
        try { await context.Database.ExecuteSqlRawAsync("ALTER TABLE Vehicles ADD COLUMN Description TEXT DEFAULT '';"); } catch { }

        // 1. Seed Admin User
        if (!await context.AdminUsers.AnyAsync())
        {
            var defaultAdmin = new AdminUser
            {
                Username = "admin",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Toyota2025!"),
                Role = "superadmin",
                CreatedAt = DateTime.UtcNow
            };
            context.AdminUsers.Add(defaultAdmin);
        }

        // 2. Seed Site Settings
        if (!await context.SiteSettings.AnyAsync())
        {
            var defaultSettings = new List<SiteSetting>
            {
                new() { Key = "site_title", Value = "Toyota Türkiye | Akıllı Model Seçim Sihirbazı", Description = "Web sayfası tarayıcı başlığı" },
                new() { Key = "meta_description", Value = "Size en uygun Toyota modelini sürüş alışkanlıklarınıza, aile yapınıza ve kullanım amacınıza göre saniyeler içinde belirleyin.", Description = "SEO Açıklaması" },
                new() { Key = "primary_color", Value = "#EB0A1E", Description = "Toyota kurumsal kırmızı vurgu rengi" },
                new() { Key = "wizard_status", Value = "open", Description = "Sihirbaz aktiflik durumu (open/closed)" },
                new() { Key = "enable_lead_capture", Value = "true", Description = "Sizi Arayalım müşteri formunu etkinleştir" },
                new() { Key = "announcement_banner", Value = "", Description = "Sayfa üstü duyuru şeridi" },
                new() { Key = "contact_phone", Value = "0800 211 64 00", Description = "İletişim Hattı" },
                new() { Key = "contact_email", Value = "iletisim@toyota.com.tr", Description = "İletişim E-posta" },
                new() { Key = "site_favicon", Value = "/favicon.ico", Description = "Sekme Favicon URL" }
            };
            context.SiteSettings.AddRange(defaultSettings);
        }

        // 3. Seed Questions & Options
        if (!await context.Questions.AnyAsync())
        {
            var intro = new Question
            {
                Id = "intro",
                OrderNum = 1,
                CategoryType = "all",
                Title = "Bu aracı hangi amaçla kullanacaksınız?",
                Subtitle = "Size en uygun kategoriyi seçelim.",
                SelectType = "single",
                MaxSelect = 1,
                IsActive = true,
                Options = new List<QuestionOption>
                {
                    new() { OrderNum = 1, Title = "Binek Araç", Description = "Sedan · SUV · Hatchback", TagsJson = "[\"binek\"]" },
                    new() { OrderNum = 2, Title = "Ticari Araç", Description = "Kamyonet · Minibüs · Van", TagsJson = "[\"commercial\"]" },
                    new() { OrderNum = 3, Title = "Her İkisi de", Description = "Size en uygun aracı birlikte bulalım", TagsJson = "[\"hybrid_usage\"]" }
                }
            };

            var seats = new Question
            {
                Id = "seats",
                OrderNum = 2,
                CategoryType = "Binek Araç",
                Title = "Kaç kişilik bir araç arıyorsunuz?",
                Subtitle = "En sık birlikte yolculuk ettiğiniz kişi sayısını seçin.",
                SelectType = "single",
                MaxSelect = 1,
                IsActive = true,
                Options = new List<QuestionOption>
                {
                    new() { OrderNum = 1, Title = "1-2 Kişi", Description = "Tek başına veya iki kişi", TagsJson = "[\"compact\",\"seats_2\"]" },
                    new() { OrderNum = 2, Title = "3-4 Kişi", Description = "Çiftler ve küçük aileler için", TagsJson = "[\"mid\",\"seats_5\"]" },
                    new() { OrderNum = 3, Title = "5 ve üzeri", Description = "Kalabalık aileler veya gruplar için", TagsJson = "[\"large\",\"seats_7\"]" }
                }
            };

            var lifestyle = new Question
            {
                Id = "lifestyle",
                OrderNum = 3,
                CategoryType = "Binek Araç",
                Title = "Hangisi yaşam tarzınızı en iyi tanımlar?",
                Subtitle = "En sık yaptığınız yolculukları düşünün. En fazla 2 seçim yapabilirsiniz.",
                SelectType = "multi",
                MaxSelect = 2,
                IsActive = true,
                Options = new List<QuestionOption>
                {
                    new() { OrderNum = 1, Title = "Şehir Hayatı", Description = "Trafik · Park · Kısa mesafe", TagsJson = "[\"city\",\"park\",\"low_fuel\"]" },
                    new() { OrderNum = 2, Title = "Macera/Doğa Aktiviteleri", Description = "Uzun yol · Arazi · Hafta sonu", TagsJson = "[\"adventure\",\"4x4\",\"awd\"]" },
                    new() { OrderNum = 3, Title = "Aile ve Çocuklu Yaşam", Description = "Konforlu yolculuk · Geniş bagaj · Kolay biniş", TagsJson = "[\"family\",\"luggage\",\"comfort\"]" }
                }
            };

            var closer = new Question
            {
                Id = "closer",
                OrderNum = 4,
                CategoryType = "Binek Araç",
                Title = "Hangisi size daha yakın?",
                Subtitle = "Araç kullanım alışkanlığınıza en yakın olanı seçin.",
                SelectType = "single",
                MaxSelect = 1,
                IsActive = true,
                Options = new List<QuestionOption>
                {
                    new() { OrderNum = 1, Title = "İlk araç deneyimi", Description = "", TagsJson = "[\"beginner\",\"easy_drive\"]" },
                    new() { OrderNum = 2, Title = "Günlük yaşam ve aktif kullanım", Description = "", TagsJson = "[\"daily\",\"hybrid\"]" },
                    new() { OrderNum = 3, Title = "Aile ve çok yönlü kullanım", Description = "", TagsJson = "[\"family\",\"suv\"]" },
                    new() { OrderNum = 4, Title = "Erişilebilirlik", Description = "", TagsJson = "[\"accessible\",\"comfortable\"]" }
                }
            };

            var usage = new Question
            {
                Id = "usage",
                OrderNum = 5,
                CategoryType = "Ticari Araç",
                Title = "Aracı nerede kullanacaksınız?",
                Subtitle = "İşinizi en iyi tanımlayan alanı seçin.",
                SelectType = "single",
                MaxSelect = 1,
                IsActive = true,
                Options = new List<QuestionOption>
                {
                    new() { OrderNum = 1, Title = "Dağıtım", Description = "Kargo · Kurye · Şehir içi teslimat", TagsJson = "[\"delivery\",\"high_capacity\"]" },
                    new() { OrderNum = 2, Title = "Teknik Servis", Description = "Beyaz eşya · Kurulum · Bakım-onarım", TagsJson = "[\"service\",\"racks\"]" },
                    new() { OrderNum = 3, Title = "Yolcu Taşımacılığı", Description = "Transfer · Servis · Turizm", TagsJson = "[\"passenger\",\"comfort_shuttle\"]" },
                    new() { OrderNum = 4, Title = "Yapı/Onarım", Description = "İnşaat · Tesisat · Tadilat", TagsJson = "[\"heavy_duty\",\"long_cargo\"]" },
                    new() { OrderNum = 5, Title = "Sanayi/Üretim", Description = "Fabrika · Atölye · Yük taşıma", TagsJson = "[\"pallet\",\"industrial\"]" },
                    new() { OrderNum = 6, Title = "Diğer", Description = "Farklı bir kullanım", TagsJson = "[\"versatile\"]" }
                }
            };

            context.Questions.AddRange(intro, seats, lifestyle, closer, usage);
        }

        // 4. Seed Categories
        if (!await context.Categories.AnyAsync())
        {
            var categories = new List<Category>
            {
                // Binek Categories (0..11)
                new() { Id = 0, Name = "Dar alanda rahat park", Color = "#5B8DBF", Icon = "P", VehicleType = "binek", OptionsJson = JsonSerializer.Serialize(new[] { "Yedek görüş kamerası", "Park sensörleri", "Çevre görüş kamerası", "Oto park sistemi", "Dar şerit tutma", "Ayna katlama", "Paralel park asistanı", "Far düzenleme" }) },
                new() { Id = 1, Name = "Uzun yolda konforlu sürüş", Color = "#8B6FB0", Icon = "→", VehicleType = "binek", OptionsJson = JsonSerializer.Serialize(new[] { "Adaptif cruise kontrol", "Masajlı ön koltuklar", "Heads-up ekran", "Şerit takip asistanı", "Gürültü yalıtımı" }) },
                new() { Id = 2, Name = "Zor arazilerde dayanıklı", Color = "#C47A52", Icon = "▲", VehicleType = "binek", OptionsJson = JsonSerializer.Serialize(new[] { "4x4 tahrik sistemi", "Yüksek sürüş açıklığı", "Çekiş kontrol modu", "Güçlü süspansiyon" }) },
                new() { Id = 3, Name = "Arka koltuk konforu", Color = "#5FA37A", Icon = "⊡", VehicleType = "binek", OptionsJson = JsonSerializer.Serialize(new[] { "Geniş bacak mesafesi", "Isıtmalı arka koltuklar", "Katlanır koltuk tepsi", "Panoramik tavan camı" }) },
                new() { Id = 4, Name = "Çekiş kabiliyeti", Color = "#C9A227", Icon = "⊕", VehicleType = "binek", HasTow = true, OptionsJson = JsonSerializer.Serialize(new[] { "Karavan çekebilen", "Bisiklet taşıyıcı", "Tavan taşıyıcı" }) },
                new() { Id = 5, Name = "Bagaj kapısı", Color = "#7A8A99", Icon = "⊟", VehicleType = "binek", OptionsJson = JsonSerializer.Serialize(new[] { "Elektrikli bagaj kapısı", "Ellersiz kapı açma", "Alçak eşik girişi" }) },
                new() { Id = 6, Name = "Kış şartlarına uyumlu", Color = "#6BA8C4", Icon = "✦", VehicleType = "binek", OptionsJson = JsonSerializer.Serialize(new[] { "4x4 kış tahrik modu", "Isıtmalı cam & aynalar", "Kış lastiği uyumlu" }) },
                new() { Id = 7, Name = "Kampa uygun", Color = "#7FA55C", Icon = "△", VehicleType = "binek", OptionsJson = JsonSerializer.Serialize(new[] { "Araç içi 230V priz", "Güçlü tavan bagajı" }) },
                new() { Id = 8, Name = "Geniş yükleme alanı", Color = "#B08A5F", Icon = "◫", VehicleType = "binek", OptionsJson = JsonSerializer.Serialize(new[] { "500L üzeri bagaj", "Yassı katlanan koltuk" }) },
                new() { Id = 9, Name = "Yakıt tüketimi", Color = "#4FA095", Icon = "◈", VehicleType = "binek", IsRadio = true, OptionsJson = JsonSerializer.Serialize(new[] { "5L/100km altı", "7L/100km altı" }) },
                new() { Id = 10, Name = "Elektrikli kullanım desteği (Hibrit)", Color = "#0072F0", Icon = "⚡", VehicleType = "binek", NoOpts = true, OptionsJson = "[]" },
                new() { Id = 11, Name = "64 renkli aydınlatma", Color = "#9B7FC4", Icon = "✧", VehicleType = "binek", NoOpts = true, OptionsJson = "[]" },

                // Commercial Categories (100..111)
                new() { Id = 100, Name = "Yükleme-indirme kolaylığı", Color = "#7C8CA1", Icon = "↑", VehicleType = "commercial", OptionsJson = JsonSerializer.Serialize(new[] { "Her iki tarafta sürgülü kapı", "Arka kapılar 180 derece açılabilen", "Arka kapılar 270 derece açılabilen", "Açık kasa" }) },
                new() { Id = 101, Name = "Yüksek park kabiliyeti", Color = "#8FA4B8", Icon = "P", VehicleType = "commercial", OptionsJson = JsonSerializer.Serialize(new[] { "180 derece geri görüş kamerası", "360 derece geri görüş kamerası", "Arka park sensörü", "Hem ön hem arka park sensörü" }) },
                new() { Id = 102, Name = "Maksimum taşınabilecek europalet adedi", Color = "#9A9AA4", Icon = "▦", VehicleType = "commercial", IsRadio = true, OptionsJson = JsonSerializer.Serialize(new[] { "1", "2", "3", "4", "5" }) },
                new() { Id = 103, Name = "Taşıma kapasitesi (yolcu dahil)", Color = "#C9B79C", Icon = "⊕", VehicleType = "commercial", IsRadio = true, OptionsJson = JsonSerializer.Serialize(new[] { "1 ton altı", "1 ton üstü" }) },
                new() { Id = 104, Name = "Yük sabitleme kancaları", Color = "#B0A08C", Icon = "⊟", VehicleType = "commercial", IsRadio = true, OptionsJson = JsonSerializer.Serialize(new[] { "Zeminde", "Zeminde ve tavanda" }) },
                new() { Id = 105, Name = "Araç içi güç çıkışı", Color = "#9AAD8A", Icon = "⚡", VehicleType = "commercial", OptionsJson = JsonSerializer.Serialize(new[] { "230V güç çıkışı (ev tipi priz)", "12V güç çıkışı (çakmaklık girişi)" }) },
                new() { Id = 106, Name = "Mobil ofis / masaya dönüşebilen orta koltuk", Color = "#8B7CA1", Icon = "⊡", VehicleType = "commercial", NoOpts = true, OptionsJson = "[]" },
                new() { Id = 107, Name = "Tüm köprü ve otoyollardan geçebilen", Color = "#7FA8A0", Icon = "→", VehicleType = "commercial", NoOpts = true, OptionsJson = "[]" },
                new() { Id = 108, Name = "Sürücü kabininden bağımsız yük bölümü", Color = "#8FA898", Icon = "◧", VehicleType = "commercial", NoOpts = true, OptionsJson = "[]" },
                new() { Id = 109, Name = "Uzun ve ince yükleri sığdırabilen", Color = "#B98A7A", Icon = "↔", VehicleType = "commercial", OptionsJson = JsonSerializer.Serialize(new[] { "3 metreye kadar boru/tel/çubuk sığdırabilen", "4 metreye kadar boru/tel/çubuk sığdırabilen", "4 metreden uzun boru/tel/çubuk sığabilen" }) },
                new() { Id = 110, Name = "Dar sokaklara rahat giren (küçük dönüş çaplı)", Color = "#A08BB0", Icon = "↺", VehicleType = "commercial", NoOpts = true, OptionsJson = "[]" },
                new() { Id = 111, Name = "Yolcu Taşımacılığı", Color = "#8B7CA1", Icon = "○", VehicleType = "commercial", IsRadio = true, ExclusivePairJson = JsonSerializer.Serialize(new[] { "Yolcu sayısı 8'e kadar", "Yolcu sayısı 8 üzeri" }), OptionsJson = JsonSerializer.Serialize(new[] { "Yolcu sayısı 8'e kadar", "Yolcu sayısı 8 üzeri" }) }
            };
            context.Categories.AddRange(categories);
        }

        // 5. Seed Vehicles
        if (!await context.Vehicles.AnyAsync())
        {
            var vehicles = new List<Vehicle>
            {
                new() {
                    Id = "corolla-cross", Name = "Corolla Cross", Type = "binek", Segment = "C-SUV",
                    StartingPrice = 2075000, Powertrain = "HYBRID",
                    CardbImage = "https://img-optimize.toyota-europe.com/ccis/zip/tr/product-token/30d2592e-700a-4720-a092-9c542aa60610/vehicle/99940/width/680/height/383/padding/0,0,0,0/image-quality/70/day-exterior-03_1L6.png",
                    ToyotaUrl = "https://www.toyota.com.tr/araba-modelleri/corolla-cross-hybrid",
                    SpecsJson = JsonSerializer.Serialize(new { bodyType = "SUV", seats = 5, tagline = "Aileler için Hibrit SUV", description = "Yüksek sürüş pozisyonu, geniş iç hacim ve 5. nesil hibrit teknolojisiyle mükemmel aile SUV deneyimi." }),
                    SupportedTagsJson = JsonSerializer.Serialize(new[] { "Geniş bacak mesafesi", "Panoramik tavan camı", "Elektrikli bagaj kapısı", "Adaptif cruise kontrol", "Şerit takip asistanı", "Park sensörleri", "Çevre görüş kamerası", "500L üzeri bagaj", "Elektrikli kullanım desteği (Hibrit)", "5L/100km altı", "Yedek görüş kamerası", "Yassı katlanan koltuk" })
                },
                new() {
                    Id = "yaris-cross", Name = "Yaris Cross", Type = "binek", Segment = "B-SUV",
                    StartingPrice = 1745000, Powertrain = "HYBRID",
                    CardbImage = "https://img-optimize.toyota-europe.com/ccis/zip/tr/product-token/d3c91452-21cf-41a4-a1ce-129e5b310d4b/vehicle/98210/width/680/height/383/padding/0,0,0,0/image-quality/70/day-exterior-03_040.png",
                    ToyotaUrl = "https://www.toyota.com.tr/araba-modelleri/yaris-cross",
                    SpecsJson = JsonSerializer.Serialize(new { bodyType = "SUV", seats = 5, tagline = "Şehirli ve Maceracı B-SUV", description = "Kompakt boyutlar, yüksek sürüş ve akıllı 4x4 yeteneği ile hem şehirde hem doğada özgürlük." }),
                    SupportedTagsJson = JsonSerializer.Serialize(new[] { "Dar alanda rahat park", "Park sensörleri", "Yedek görüş kamerası", "Dar şerit tutma", "Ayna katlama", "5L/100km altı", "Elektrikli kullanım desteği (Hibrit)", "Adaptif cruise kontrol", "Yüksek sürüş açıklığı", "Çekiş kontrol modu" })
                },
                new() {
                    Id = "c-hr", Name = "Toyota C-HR", Type = "binek", Segment = "Coupe SUV",
                    StartingPrice = 1925000, Powertrain = "HYBRID",
                    CardbImage = "https://img-optimize.toyota-europe.com/ccis/zip/tr/product-token/a1337de6-7dd7-45b7-816b-dff99650cf8d/vehicle/103392/width/680/height/383/padding/0,0,0,0/image-quality/70/day-exterior-03_M35.png",
                    ToyotaUrl = "https://www.toyota.com.tr/araba-modelleri/c-hr",
                    SpecsJson = JsonSerializer.Serialize(new { bodyType = "Coupe SUV", seats = 5, tagline = "İkonik Tasarım & İleri Teknoloji", description = "Ezber bozan dinamik tasarımı, 64 renkli ambiyans aydınlatması ve en son sürüş asistanları." }),
                    SupportedTagsJson = JsonSerializer.Serialize(new[] { "64 renkli aydınlatma", "Adaptif cruise kontrol", "Heads-up ekran", "Şerit takip asistanı", "Elektrikli kullanım desteği (Hibrit)", "Panoramik tavan camı", "Park sensörleri", "Çevre görüş kamerası", "5L/100km altı" })
                },
                new() {
                    Id = "corolla-sedan", Name = "Corolla Sedan", Type = "binek", Segment = "Sedan",
                    StartingPrice = 1615000, Powertrain = "BENZİN | HYBRID",
                    CardbImage = "https://img-optimize.toyota-europe.com/ccis/zip/tr/product-token/61c63195-8c8f-4deb-b255-a2589cff23a9/vehicle/96518/width/680/height/383/padding/0,0,0,0/image-quality/70/day-exterior-03_040.png",
                    ToyotaUrl = "https://www.toyota.com.tr/araba-modelleri/corolla-sedan",
                    SpecsJson = JsonSerializer.Serialize(new { bodyType = "Sedan", seats = 5, tagline = "Dünyanın En Çok Tercih Edilen Otomobili", description = "Efsanevi dayanıklılık, ferah kabin, üstün sürüş konforu ve düşük yakıt tüketimi." }),
                    SupportedTagsJson = JsonSerializer.Serialize(new[] { "Geniş bacak mesafesi", "Gürültü yalıtımı", "Adaptif cruise kontrol", "Elektrikli kullanım desteği (Hibrit)", "5L/100km altı", "7L/100km altı", "Park sensörleri", "Şerit takip asistanı" })
                },
                new() {
                    Id = "yaris", Name = "Yaris", Type = "binek", Segment = "Hatchback",
                    StartingPrice = 1420000, Powertrain = "HYBRID",
                    CardbImage = "https://img-optimize.toyota-europe.com/ccis/zip/tr/product-token/2bf36919-8adf-4fb0-80f0-0da53734988a/vehicle/100132/width/680/height/383/padding/0,0,0,0/image-quality/70/day-exterior-03_040.png",
                    ToyotaUrl = "https://www.toyota.com.tr/araba-modelleri/yaris",
                    SpecsJson = JsonSerializer.Serialize(new { bodyType = "Hatchback", seats = 5, tagline = "Şehrin Enerjisi", description = "Çevik yol tutuşu, üstün manevra kabiliyeti ve sınıfının en düşük yakıt tüketimi." }),
                    SupportedTagsJson = JsonSerializer.Serialize(new[] { "Dar alanda rahat park", "5L/100km altı", "Elektrikli kullanım desteği (Hibrit)", "Yedek görüş kamerası", "Park sensörleri", "Dar şerit tutma", "Ayna katlama" })
                },
                new() {
                    Id = "rav4", Name = "RAV4 Hybrid", Type = "binek", Segment = "D-SUV",
                    StartingPrice = 3280000, Powertrain = "HYBRID AWD-i",
                    CardbImage = "https://img-optimize.toyota-europe.com/ccis/zip/pl/product-token/1350d268-6221-4222-acd8-cdaae43be5c4/vehicle/100411/width/680/height/383/padding/0,0,0,0/image-quality/70/day-exterior-03_218.png",
                    ToyotaUrl = "https://www.toyota.com.tr/araba-modelleri/rav4-hybrid",
                    SpecsJson = JsonSerializer.Serialize(new { bodyType = "SUV", seats = 5, tagline = "Güçlü, Yetenekli ve Hibrit Öncüsü", description = "AWD-i akıllı dört çeker sistemi, 580 litrelik dev bagaj ve olağanüstü performans." }),
                    SupportedTagsJson = JsonSerializer.Serialize(new[] { "4x4 tahrik sistemi", "500L üzeri bagaj", "Elektrikli bagaj kapısı", "Karavan çekebilen", "Geniş bacak mesafesi", "Elektrikli kullanım desteği (Hibrit)", "Adaptif cruise kontrol", "Şerit takip asistanı", "4x4 kış tahrik modu", "Isıtmalı cam & aynalar", "Panoramik tavan camı" })
                },
                new() {
                    Id = "camry", Name = "Camry", Type = "binek", Segment = "E-Sedan",
                    StartingPrice = 4150000, Powertrain = "HYBRID",
                    CardbImage = "https://img-optimize.toyota-europe.com/ccis/zip/pl/product-token/18355c02-1291-41bc-b632-b0d10aadc1ce/vehicle/5e195cdc-de88-42ef-8aca-b66ac3f0a0ff/width/680/height/383/padding/0,0,0,0/image-quality/70/day-exterior-03_4y6.png",
                    ToyotaUrl = "https://www.toyota.com.tr/araba-modelleri/camry",
                    SpecsJson = JsonSerializer.Serialize(new { bodyType = "Sedan", seats = 5, tagline = "Prestij ve Üst Düzey Konfor", description = "Zarif tasarım, lüks iç mekan, sessiz kabin ve güçlü hibrit motoru ile prestijli sürüş." }),
                    SupportedTagsJson = JsonSerializer.Serialize(new[] { "Geniş bacak mesafesi", "Gürültü yalıtımı", "Masajlı ön koltuklar", "Isıtmalı arka koltuklar", "Adaptif cruise kontrol", "Heads-up ekran", "Elektrikli kullanım desteği (Hibrit)" })
                },
                new() {
                    Id = "land-cruiser-prado", Name = "Land Cruiser Prado", Type = "binek", Segment = "Off-Road SUV",
                    StartingPrice = 6450000, Powertrain = "DİZEL 4x4",
                    CardbImage = "https://img-optimize.toyota-europe.com/ccis/zip/tr/product-token/9247e721-2109-483c-9c76-b55a9d327c65/vehicle/101581/width/680/height/383/padding/0,0,0,0/image-quality/70/day-exterior-03_4V8.png",
                    ToyotaUrl = "https://www.toyota.com.tr/araba-modelleri/land-cruiser-prado",
                    SpecsJson = JsonSerializer.Serialize(new { bodyType = "SUV", seats = 7, tagline = "Efsanevi Arazi İkonu", description = "70 yılı aşkın efsane miras, en zorlu arazi şartlarında durdurulamaz güç ve 7 kişilik lüks." }),
                    SupportedTagsJson = JsonSerializer.Serialize(new[] { "4x4 tahrik sistemi", "Yüksek sürüş açıklığı", "Çekiş kontrol modu", "Güçlü süspansiyon", "Karavan çekebilen", "500L üzeri bagaj", "4x4 kış tahrik modu", "Isıtmalı cam & aynalar" })
                },
                new() {
                    Id = "hilux", Name = "Hilux", Type = "commercial", Segment = "Pick-Up",
                    StartingPrice = 1980000, Powertrain = "DİZEL 4x4",
                    CardbImage = "https://img-optimize.toyota-europe.com/ccis/zip/tr/product-token/796893e8-e0dd-49b7-addd-c3b4cb803b41/vehicle/102759/width/680/height/383/padding/0,0,0,0/image-quality/70/day-exterior-03_5C7.png",
                    ToyotaUrl = "https://www.toyota.com.tr/araba-modelleri/hilux",
                    SpecsJson = JsonSerializer.Serialize(new { bodyType = "Pick-up", seats = 5, tagline = "Yenilmez ve Efsanevi Dayanıklılık", description = "1 ton yük kapasitesi, 3.5 ton çekme gücü ve efsanevi 4x4 arazi kabiliyeti." }),
                    SupportedTagsJson = JsonSerializer.Serialize(new[] { "Açık kasa", "4x4 tahrik sistemi", "Karavan çekebilen", "1 ton üstü", "Zeminde ve tavanda", "Zor arazilerde dayanıklı" })
                },
                new() {
                    Id = "proace-city", Name = "Proace City Cargo", Type = "commercial", Segment = "Hafif Ticari Van",
                    StartingPrice = 1190000, Powertrain = "DİZEL",
                    CardbImage = "https://img-optimize.toyota-europe.com/ccis/zip/tr/product-token/e6569396-c137-4c51-8e5a-d4f70f44f110/vehicle/82131/width/680/height/383/padding/0,0,0,0/image-quality/70/day-exterior-03_EPR.png",
                    ToyotaUrl = "https://www.toyota.com.tr/araba-modelleri/proace-city-cargo",
                    SpecsJson = JsonSerializer.Serialize(new { bodyType = "Van", seats = 2, tagline = "İşinizin Çevik ve Güvenilir Ortağı", description = "Geniş yükleme hacmi, akıllı Smart Cargo sistemi ve düşük işletme maliyeti." }),
                    SupportedTagsJson = JsonSerializer.Serialize(new[] { "Her iki tarafta sürgülü kapı", "Arka kapılar 180 derece açılabilen", "180 derece geri görüş kamerası", "Arka park sensörü", "Mobil ofis / masaya dönüşebilen orta koltuk", "Tüm köprü ve otoyollardan geçebilen", "Sürücü kabininden bağımsız yük bölümü", "3 metreye kadar boru/tel/çubuk sığdırabilen", "Dar sokaklara rahat giren (küçük dönüş çaplı)" })
                },
                new() {
                    Id = "proace-city-verso", Name = "Proace City Verso", Type = "binek-ticari", Segment = "Kombi",
                    StartingPrice = 1480000, Powertrain = "DİZEL",
                    CardbImage = "https://img-optimize.toyota-europe.com/ccis/zip/tr/product-token/e6569396-c137-4c51-8e5a-d4f70f44f110/vehicle/82131/width/680/height/383/padding/0,0,0,0/image-quality/70/day-exterior-03_EPR.png",
                    ToyotaUrl = "https://www.toyota.com.tr/araba-modelleri/proace-city-verso",
                    SpecsJson = JsonSerializer.Serialize(new { bodyType = "Kombi", seats = 5, tagline = "Hem İşiniz Hem Aileniz İçin", description = "Binek araç konforu, ticari araç fonksiyonelliği ve geniş iç yaşam alanı." }),
                    SupportedTagsJson = JsonSerializer.Serialize(new[] { "Geniş bacak mesafesi", "Katlanır koltuk tepsi", "Elektrikli bagaj kapısı", "500L üzeri bagaj", "Yassı katlanan koltuk", "Her iki tarafta sürgülü kapı", "Arka park sensörü" })
                },
                new() {
                    Id = "proace", Name = "Proace Cargo", Type = "commercial", Segment = "Orta Boy Van",
                    StartingPrice = 1650000, Powertrain = "DİZEL",
                    CardbImage = "https://img-optimize.toyota-europe.com/ccis/zip/tr/product-token/4abf7b94-ee9f-4b55-836c-f68040d9e1f8/vehicle/100855/width/680/height/383/padding/0,0,0,0/image-quality/70/day-exterior-03_EPR.png",
                    ToyotaUrl = "https://www.toyota.com.tr/araba-modelleri/proace-cargo",
                    SpecsJson = JsonSerializer.Serialize(new { bodyType = "Panelvan", seats = 3, tagline = "Büyük İşlerin Güçlü Çözümü", description = "Geniş taşıma hacmi, 3 europalet kapasitesi ve güçlü dizel motor." }),
                    SupportedTagsJson = JsonSerializer.Serialize(new[] { "Arka kapılar 180 derece açılabilen", "Arka kapılar 270 derece açılabilen", "1 ton üstü", "Zeminde ve tavanda", "Sürücü kabininden bağımsız yük bölümü", "4 metreye kadar boru/tel/çubuk sığdırabilen" })
                },
                new() {
                    Id = "proace-verso", Name = "Proace Verso", Type = "commercial", Segment = "Minibüs & VIP Shuttle",
                    StartingPrice = 2490000, Powertrain = "DİZEL",
                    CardbImage = "https://img-optimize.toyota-europe.com/ccis/zip/tr/product-token/40309f75-11b2-443d-bf3c-d26f99103885/vehicle/96216/width/680/height/383/padding/0,0,0,0/image-quality/70/day-exterior-03_KKJ.png",
                    ToyotaUrl = "https://www.toyota.com.tr/araba-modelleri/proace-verso",
                    SpecsJson = JsonSerializer.Serialize(new { bodyType = "Minibüs", seats = 9, tagline = "Lüks Yolcu Taşımacılığı", description = "9 kişilik geniş oturma kapasitesi, modüler koltuk yapısı ve VIP transfer konforu." }),
                    SupportedTagsJson = JsonSerializer.Serialize(new[] { "Yolcu sayısı 8 üzeri", "Yolcu sayısı 8'e kadar", "Geniş bacak mesafesi", "Isıtmalı arka koltuklar", "Adaptif cruise kontrol" })
                }
            };
            context.Vehicles.AddRange(vehicles);
        }

        // 6. Seed Matching Rules
        if (!await context.MatchingRules.AnyAsync())
        {
            var rules = new List<MatchingRule>
            {
                new() { SourceType = "question", SourceId = "lifestyle:Şehir Hayatı", SourceLabel = "Şehir Hayatı", VehicleId = "yaris", Weight = 30, ReasonBadge = "Şehir İçi Kompakt Boyutlar" },
                new() { SourceType = "question", SourceId = "lifestyle:Şehir Hayatı", SourceLabel = "Şehir Hayatı", VehicleId = "yaris-cross", Weight = 25, ReasonBadge = "Yüksek Sürüş Pozisyonu" },
                new() { SourceType = "question", SourceId = "lifestyle:Şehir Hayatı", SourceLabel = "Şehir Hayatı", VehicleId = "corolla-sedan", Weight = 20, ReasonBadge = "Kullanışlı Şehir Sedan" },
                new() { SourceType = "question", SourceId = "lifestyle:Şehir Hayatı", SourceLabel = "Şehir Hayatı", VehicleId = "c-hr", Weight = 20, ReasonBadge = "Çarpıcı Şehir Tasarımı" },

                new() { SourceType = "question", SourceId = "lifestyle:Macera/Doğa Aktiviteleri", SourceLabel = "Macera/Doğa Aktiviteleri", VehicleId = "rav4", Weight = 35, ReasonBadge = "AWD-i Akıllı 4 Çeker" },
                new() { SourceType = "question", SourceId = "lifestyle:Macera/Doğa Aktiviteleri", SourceLabel = "Macera/Doğa Aktiviteleri", VehicleId = "hilux", Weight = 35, ReasonBadge = "Zorlu Arazi Lideri" },
                new() { SourceType = "question", SourceId = "lifestyle:Macera/Doğa Aktiviteleri", SourceLabel = "Macera/Doğa Aktiviteleri", VehicleId = "land-cruiser-prado", Weight = 40, ReasonBadge = "Efsanevi Arazi Yeteneği" },
                new() { SourceType = "question", SourceId = "lifestyle:Macera/Doğa Aktiviteleri", SourceLabel = "Macera/Doğa Aktiviteleri", VehicleId = "corolla-cross", Weight = 20, ReasonBadge = "Hafta Sonu Kamp Uyumu" },

                new() { SourceType = "question", SourceId = "lifestyle:Aile ve Çocuklu Yaşam", SourceLabel = "Aile ve Çocuklu Yaşam", VehicleId = "corolla-cross", Weight = 30, ReasonBadge = "Geniş Aile Hacmi" },
                new() { SourceType = "question", SourceId = "lifestyle:Aile ve Çocuklu Yaşam", SourceLabel = "Aile ve Çocuklu Yaşam", VehicleId = "rav4", Weight = 30, ReasonBadge = "580L Devasa Bagaj" },
                new() { SourceType = "question", SourceId = "lifestyle:Aile ve Çocuklu Yaşam", SourceLabel = "Aile ve Çocuklu Yaşam", VehicleId = "corolla-sedan", Weight = 25, ReasonBadge = "Aile Sedan Konforu" },
                new() { SourceType = "question", SourceId = "lifestyle:Aile ve Çocuklu Yaşam", SourceLabel = "Aile ve Çocuklu Yaşam", VehicleId = "proace-city-verso", Weight = 35, ReasonBadge = "Geniş Aile & Çocuklu Kullanım" },

                new() { SourceType = "question", SourceId = "seats:1-2 Kişi", SourceLabel = "1-2 Kişi", VehicleId = "yaris", Weight = 25, ReasonBadge = "Kompakt Boyut" },
                new() { SourceType = "question", SourceId = "seats:1-2 Kişi", SourceLabel = "1-2 Kişi", VehicleId = "c-hr", Weight = 25, ReasonBadge = "Dinamik Coupe SUV" },
                new() { SourceType = "question", SourceId = "seats:3-4 Kişi", SourceLabel = "3-4 Kişi", VehicleId = "corolla-sedan", Weight = 25, ReasonBadge = "Geniş Yaşam Alanı" },
                new() { SourceType = "question", SourceId = "seats:3-4 Kişi", SourceLabel = "3-4 Kişi", VehicleId = "corolla-cross", Weight = 25, ReasonBadge = "Geniş C-SUV Alanı" },
                new() { SourceType = "question", SourceId = "seats:3-4 Kişi", SourceLabel = "3-4 Kişi", VehicleId = "yaris-cross", Weight = 20, ReasonBadge = "Pratik İç Hacim" },
                new() { SourceType = "question", SourceId = "seats:5 ve üzeri", SourceLabel = "5 ve üzeri", VehicleId = "proace-verso", Weight = 40, ReasonBadge = "9 Kişilik Yolcu Kapasitesi" },
                new() { SourceType = "question", SourceId = "seats:5 ve üzeri", SourceLabel = "5 ve üzeri", VehicleId = "proace-city-verso", Weight = 30, ReasonBadge = "7 Kişilik Geniş Hacim" },
                new() { SourceType = "question", SourceId = "seats:5 ve üzeri", SourceLabel = "5 ve üzeri", VehicleId = "land-cruiser-prado", Weight = 30, ReasonBadge = "7 Kişilik Lüks Arazi" },

                new() { SourceType = "question", SourceId = "usage:Dağıtım", SourceLabel = "Dağıtım", VehicleId = "proace-city", Weight = 35, ReasonBadge = "Kargo & Şehir İçi Teslimat" },
                new() { SourceType = "question", SourceId = "usage:Dağıtım", SourceLabel = "Dağıtım", VehicleId = "proace", Weight = 30, ReasonBadge = "Büyük Hacimli Yükleme" },
                new() { SourceType = "question", SourceId = "usage:Teknik Servis", SourceLabel = "Teknik Servis", VehicleId = "proace-city", Weight = 35, ReasonBadge = "Mobil Atölye & Raf Uyumu" },
                new() { SourceType = "question", SourceId = "usage:Yolcu Taşımacılığı", SourceLabel = "Yolcu Taşımacılığı", VehicleId = "proace-verso", Weight = 40, ReasonBadge = "VIP & Turizm Transferi" },
                new() { SourceType = "question", SourceId = "usage:Yolcu Taşımacılığı", SourceLabel = "Yolcu Taşımacılığı", VehicleId = "proace-city-verso", Weight = 30, ReasonBadge = "Konforlu Shuttle" },
                new() { SourceType = "question", SourceId = "usage:Yapı/Onarım", SourceLabel = "Yapı/Onarım", VehicleId = "hilux", Weight = 40, ReasonBadge = "1 Ton İstiap & 3.5 Ton Çekme" },
                new() { SourceType = "question", SourceId = "usage:Yapı/Onarım", SourceLabel = "Yapı/Onarım", VehicleId = "proace", Weight = 30, ReasonBadge = "Uzun Malzeme Taşıma" },
                new() { SourceType = "question", SourceId = "usage:Sanayi/Üretim", SourceLabel = "Sanayi/Üretim", VehicleId = "proace", Weight = 35, ReasonBadge = "Europalet Taşıma Kapasitesi" },

                new() { SourceType = "category", SourceId = "cat:0:Dar alanda rahat park", SourceLabel = "Dar alanda rahat park", VehicleId = "yaris", Weight = 30, ReasonBadge = "Kompakt Boyut & Kolay Park" },
                new() { SourceType = "category", SourceId = "cat:0:Dar alanda rahat park", SourceLabel = "Dar alanda rahat park", VehicleId = "yaris-cross", Weight = 25, ReasonBadge = "Geri Görüş & Park Sensörü" },
                new() { SourceType = "category", SourceId = "cat:0:Dar alanda rahat park", SourceLabel = "Dar alanda rahat park", VehicleId = "c-hr", Weight = 20, ReasonBadge = "Otomatik Park Asistanı" },

                new() { SourceType = "category", SourceId = "cat:1:Uzun yolda konforlu sürüş", SourceLabel = "Uzun yolda konforlu sürüş", VehicleId = "camry", Weight = 35, ReasonBadge = "Premium Sedan Konforu" },
                new() { SourceType = "category", SourceId = "cat:1:Uzun yolda konforlu sürüş", SourceLabel = "Uzun yolda konforlu sürüş", VehicleId = "rav4", Weight = 30, ReasonBadge = "Adaptif Cruise & Şerit Takip" },
                new() { SourceType = "category", SourceId = "cat:1:Uzun yolda konforlu sürüş", SourceLabel = "Uzun yolda konforlu sürüş", VehicleId = "corolla-sedan", Weight = 25, ReasonBadge = "Sessiz Kabin Yalıtımı" },

                new() { SourceType = "category", SourceId = "cat:2:Zor arazilerde dayanıklı", SourceLabel = "Zor arazilerde dayanıklı", VehicleId = "hilux", Weight = 40, ReasonBadge = "4x4 Ağır Arazi Şasisi" },
                new() { SourceType = "category", SourceId = "cat:2:Zor arazilerde dayanıklı", SourceLabel = "Zor arazilerde dayanıklı", VehicleId = "land-cruiser-prado", Weight = 40, ReasonBadge = "Crawl Control & Kilitli Dif." },
                new() { SourceType = "category", SourceId = "cat:2:Zor arazilerde dayanıklı", SourceLabel = "Zor arazilerde dayanıklı", VehicleId = "rav4", Weight = 25, ReasonBadge = "Trail Modu & AWD" },

                new() { SourceType = "category", SourceId = "cat:3:Arka koltuk konforu", SourceLabel = "Arka koltuk konforu", VehicleId = "camry", Weight = 35, ReasonBadge = "Geniş Arka Diz Mesafesi" },
                new() { SourceType = "category", SourceId = "cat:3:Arka koltuk konforu", SourceLabel = "Arka koltuk konforu", VehicleId = "corolla-sedan", Weight = 25, ReasonBadge = "Ergonomik Arka Koltuklar" },
                new() { SourceType = "category", SourceId = "cat:3:Arka koltuk konforu", SourceLabel = "Arka koltuk konforu", VehicleId = "proace-verso", Weight = 30, ReasonBadge = "Kaptan Koltuk Düzeni" },

                new() { SourceType = "category", SourceId = "cat:4:Çekiş kabiliyeti", SourceLabel = "Çekiş kabiliyeti", VehicleId = "hilux", Weight = 40, ReasonBadge = "3500 kg Çekme Gücü" },
                new() { SourceType = "category", SourceId = "cat:4:Çekiş kabiliyeti", SourceLabel = "Çekiş kabiliyeti", VehicleId = "land-cruiser-prado", Weight = 40, ReasonBadge = "Karavan & Römork Ustası" },
                new() { SourceType = "category", SourceId = "cat:4:Çekiş kabiliyeti", SourceLabel = "Çekiş kabiliyeti", VehicleId = "rav4", Weight = 25, ReasonBadge = "1650 kg Çekiş Kapasitesi" },

                new() { SourceType = "category", SourceId = "cat:8:Geniş yükleme alanı", SourceLabel = "Geniş yükleme alanı", VehicleId = "corolla-cross", Weight = 30, ReasonBadge = "436L Geniş Bagaj" },
                new() { SourceType = "category", SourceId = "cat:8:Geniş yükleme alanı", SourceLabel = "Geniş yükleme alanı", VehicleId = "rav4", Weight = 35, ReasonBadge = "580L Elektrikli Bagaj" },
                new() { SourceType = "category", SourceId = "cat:8:Geniş yükleme alanı", SourceLabel = "Geniş yükleme alanı", VehicleId = "proace-city", Weight = 35, ReasonBadge = "3.8 m³ Kargo Hacmi" },

                new() { SourceType = "category", SourceId = "cat:9:Yakıt tüketimi", SourceLabel = "Yakıt tüketimi (5L altı)", VehicleId = "yaris", Weight = 35, ReasonBadge = "3.8L / 100km Tüketim" },
                new() { SourceType = "category", SourceId = "cat:9:Yakıt tüketimi", SourceLabel = "Yakıt tüketimi (5L altı)", VehicleId = "corolla-sedan", Weight = 30, ReasonBadge = "4.4L / 100km Hibrit" },
                new() { SourceType = "category", SourceId = "cat:9:Yakıt tüketimi", SourceLabel = "Yakıt tüketimi (5L altı)", VehicleId = "yaris-cross", Weight = 25, ReasonBadge = "4.5L / 100km Hibrit" },
                new() { SourceType = "category", SourceId = "cat:9:Yakıt tüketimi", SourceLabel = "Yakıt tüketimi (5L altı)", VehicleId = "c-hr", Weight = 25, ReasonBadge = "4.8L / 100km Tüketim" },

                new() { SourceType = "category", SourceId = "cat:10:Elektrikli kullanım desteği (Hibrit)", SourceLabel = "Hibrit", VehicleId = "corolla-sedan", Weight = 25, ReasonBadge = "5. Nesil Hibrit Motor" },
                new() { SourceType = "category", SourceId = "cat:10:Elektrikli kullanım desteği (Hibrit)", SourceLabel = "Hibrit", VehicleId = "yaris", Weight = 25, ReasonBadge = "Kendini Şarj Eden Hibrit" },
                new() { SourceType = "category", SourceId = "cat:10:Elektrikli kullanım desteği (Hibrit)", SourceLabel = "Hibrit", VehicleId = "c-hr", Weight = 25, ReasonBadge = "Yeni Nesil Hibrit Gücü" },
                new() { SourceType = "category", SourceId = "cat:10:Elektrikli kullanım desteği (Hibrit)", SourceLabel = "Hibrit", VehicleId = "corolla-cross", Weight = 25, ReasonBadge = "Güçlü Hibrit Dinamizmi" },
                new() { SourceType = "category", SourceId = "cat:10:Elektrikli kullanım desteği (Hibrit)", SourceLabel = "Hibrit", VehicleId = "rav4", Weight = 25, ReasonBadge = "222 HP Hibrit Güç" }
            };
            context.MatchingRules.AddRange(rules);
        }

        await context.SaveChangesAsync();
    }
}
