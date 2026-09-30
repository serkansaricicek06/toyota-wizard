-- ====================================================================
-- TOYOTA MODEL SEÇİM SİHİRBAZI - KURUMSAL VERİTABANI ŞEMASI VE TOHUMLAMA (SEED)
-- Uyumlu Motorlar: SQLite / MS SQL Server / PostgreSQL / MySQL
-- ====================================================================

-- 1. YÖNETİCİ KULLANICILAR TABLOSU
CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(100) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    full_name VARCHAR(150) DEFAULT '',
    role VARCHAR(50) DEFAULT 'admin',
    is_active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. SİTE & SEO AYARLARI TABLOSU
CREATE TABLE IF NOT EXISTS site_settings (
    key VARCHAR(100) PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 3. DİNAMİK SORULAR TABLOSU
CREATE TABLE IF NOT EXISTS questions (
    id VARCHAR(50) PRIMARY KEY,
    order_num INTEGER NOT NULL,
    category_type VARCHAR(50) NOT NULL, -- 'all' | 'Binek Araç' | 'Ticari Araç'
    title VARCHAR(255) NOT NULL,
    subtitle TEXT,
    select_type VARCHAR(20) DEFAULT 'single', -- 'single' | 'multi'
    max_select INTEGER DEFAULT 1,
    is_active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 4. SORU SEÇENEKLERİ TABLOSU
CREATE TABLE IF NOT EXISTS question_options (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question_id VARCHAR(50) NOT NULL,
    order_num INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    tags_json TEXT DEFAULT '[]',
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);

-- 5. İHTİYAÇ KATEGORİ BALONLARI TABLOSU
CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    color VARCHAR(30) DEFAULT '#5B8DBF',
    icon VARCHAR(20) DEFAULT '★',
    vehicle_type VARCHAR(50) DEFAULT 'binek', -- 'binek' | 'commercial'
    is_radio INTEGER DEFAULT 0,
    has_tow INTEGER DEFAULT 0,
    no_opts INTEGER DEFAULT 0,
    exclusive_pair_json TEXT DEFAULT '[]',
    options_json TEXT DEFAULT '[]',
    is_active INTEGER DEFAULT 1
);

-- 6. TOYOTA ARAÇ KATALOĞU TABLOSU
CREATE TABLE IF NOT EXISTS vehicles (
    id VARCHAR(100) PRIMARY KEY,
    model_code VARCHAR(100),
    name VARCHAR(150) NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'binek' | 'commercial' | 'binek-ticari'
    segment VARCHAR(50),
    starting_price INTEGER DEFAULT 0,
    powertrain VARCHAR(100),
    cardb_token VARCHAR(100),
    cardb_image TEXT,
    toyota_url TEXT,
    specs_json TEXT DEFAULT '{}',
    supported_tags_json TEXT DEFAULT '[]',
    is_active INTEGER DEFAULT 1
);

-- 7. EŞLEŞTİRME VE PUANLAMA KURALLARI TABLOSU
CREATE TABLE IF NOT EXISTS matching_rules (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    source_type VARCHAR(50) NOT NULL, -- 'question' | 'category'
    source_id VARCHAR(255) NOT NULL,
    source_label VARCHAR(255) NOT NULL,
    vehicle_id VARCHAR(100) NOT NULL,
    weight INTEGER DEFAULT 10,
    reason_badge VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(source_id, vehicle_id)
);

-- 8. MÜŞTERİ TALEPLERİ (LEAD) TABLOSU
CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name VARCHAR(150) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    city VARCHAR(100),
    matched_model VARCHAR(100),
    selections_json TEXT DEFAULT '{}',
    status VARCHAR(50) DEFAULT 'Yeni', -- 'Yeni' | 'Arandı' | 'Teklif Verildi' | 'Satış'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 9. ANALİTİK OTURUMLARI TABLOSU
CREATE TABLE IF NOT EXISTS analytics_sessions (
    session_id VARCHAR(100) PRIMARY KEY,
    device_type VARCHAR(20) DEFAULT 'desktop',
    last_step VARCHAR(50) DEFAULT 'intro',
    last_step_name VARCHAR(100) DEFAULT 'Giriş Sayfası',
    reached_result INTEGER DEFAULT 0,
    completed_lead INTEGER DEFAULT 0,
    total_duration_seconds INTEGER DEFAULT 0,
    matched_vehicle VARCHAR(100) DEFAULT '',
    started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 10. ANALİTİK OLAYLARI TABLOSU
CREATE TABLE IF NOT EXISTS analytics_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id VARCHAR(100) NOT NULL,
    step_id VARCHAR(50) NOT NULL,
    step_name VARCHAR(100) NOT NULL,
    step_index INTEGER DEFAULT 0,
    time_on_step_seconds INTEGER DEFAULT 0,
    total_elapsed_seconds INTEGER DEFAULT 0,
    is_exit INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ====================================================================
-- SEED DATA (BAŞLANGIÇ VERİLERİ)
-- ====================================================================

-- 1. Admin Kullanıcı (Kullanıcı Adı: admin, Şifre: Toyota2025!)
INSERT OR IGNORE INTO admins (id, username, password_hash, full_name, role)
VALUES (1, 'admin', '$2a$12$e0X7J9Z6KkO1bHq0XQ9xee8b5Pq1T2hG7Y3R9V4J0M8K5L2P9W6Qe', 'Sistem Yöneticisi', 'admin');

-- 2. Site Ayarları
INSERT OR REPLACE INTO site_settings (key, value) VALUES
('meta_title', 'Toyota Araç Seçici | Size En Uygun Toyota Modelini Keşfedin'),
('meta_description', 'İhtiyaçlarınıza, yaşam tarzınıza ve bütçenize en uygun Toyota binek veya ticari aracını akıllı filtreleme ile saniyeler içinde bulun.'),
('meta_keywords', 'toyota, hibrit, suv, corolla, yaris, c-hr, rav4, hilux, proace, binek araç, ticari araç'),
('primary_color', '#EB0A1E'),
('wizard_status', 'open'),
('enable_lead_capture', 'true'),
('announcement_banner', ''),
('site_logo', '/official_figma_toyota_logo.svg'),
('contact_phone', '0800 211 64 00'),
('contact_email', 'iletisim@toyota.com.tr');

-- 3. Dinamik Sorular (Binek / Ticari Tam İzolasyonlu)
INSERT OR REPLACE INTO questions (id, order_num, category_type, title, subtitle, select_type, max_select) VALUES
('intro', 1, 'all', 'Bu aracı hangi amaçla kullanacaksınız?', 'Size en uygun kategoriyi seçelim.', 'single', 1),
('seats', 2, 'Binek Araç', 'Kaç kişilik bir araç arıyorsunuz?', 'En sık birlikte yolculuk ettiğiniz kişi sayısını seçin.', 'single', 1),
('lifestyle', 3, 'Binek Araç', 'Hangisi yaşam tarzınızı en iyi tanımlar?', 'En sık yaptığınız yolculukları düşünün. En fazla 2 seçim yapabilirsiniz.', 'multi', 2),
('closer', 4, 'Binek Araç', 'Hangisi size daha yakın?', 'Araç kullanım alışkanlığınıza en yakın olanı seçin.', 'single', 1),
('usage', 5, 'Ticari Araç', 'Aracı nerede kullanacaksınız?', 'İşinizi en iyi tanımlayan alanı seçin.', 'single', 1);

-- 4. Soru Seçenekleri
DELETE FROM question_options;
INSERT INTO question_options (question_id, order_num, title, description, tags_json) VALUES
('intro', 1, 'Binek Araç', 'Sedan · SUV · Hatchback', '["binek"]'),
('intro', 2, 'Ticari Araç', 'Kamyonet · Minibüs · Van', '["commercial"]'),
('intro', 3, 'Her İkisi de', 'Size en uygun aracı birlikte bulalım', '["hybrid_usage"]'),

('seats', 1, '1-2 Kişi', 'Tek başına veya iki kişi', '["compact","seats_2"]'),
('seats', 2, '3-4 Kişi', 'Çiftler ve küçük aileler için', '["mid","seats_5"]'),
('seats', 3, '5 ve üzeri', 'Kalabalık aileler veya gruplar için', '["large","seats_7"]'),

('lifestyle', 1, 'Şehir Hayatı', 'Trafik · Park · Kısa mesafe', '["city","park","low_fuel"]'),
('lifestyle', 2, 'Macera/Doğa Aktiviteleri', 'Uzun yol · Arazi · Hafta sonu', '["adventure","4x4","awd"]'),
('lifestyle', 3, 'Aile ve Çocuklu Yaşam', 'Konforlu yolculuk · Geniş bagaj · Kolay biniş', '["family","luggage","comfort"]'),

('closer', 1, 'İlk araç deneyimi', '', '["beginner","easy_drive"]'),
('closer', 2, 'Günlük yaşam ve aktif kullanım', '', '["daily","hybrid"]'),
('closer', 3, 'Aile ve çok yönlü kullanım', '', '["family","suv"]'),
('closer', 4, 'Erişilebilirlik', '', '["accessible","comfortable"]'),

('usage', 1, 'Dağıtım', 'Kargo · Kurye · Şehir içi teslimat', '["delivery","high_capacity"]'),
('usage', 2, 'Teknik Servis', 'Beyaz eşya · Kurulum · Bakım-onarım', '["service","racks"]'),
('usage', 3, 'Yolcu Taşımacılığı', 'Transfer · Servis · Turizm', '["passenger","comfort_shuttle"]'),
('usage', 4, 'Yapı/Onarım', 'İnşaat · Tesisat · Tadilat', '["heavy_duty","long_cargo"]'),
('usage', 5, 'Sanayi/Üretim', 'Fabrika · Atölye · Yük taşıma', '["pallet","industrial"]'),
('usage', 6, 'Diğer', 'Farklı bir kullanım', '["versatile"]');

-- 5. İhtiyaç Balonları (12 Binek + 11 Ticari)
INSERT OR REPLACE INTO categories (id, name, color, icon, vehicle_type, is_radio, has_tow, no_opts, exclusive_pair_json, options_json) VALUES
(0, 'Dar alanda rahat park', '#5B8DBF', 'P', 'binek', 0, 0, 0, '[]', '["Yedek görüş kamerası","Park sensörleri","Çevre görüş kamerası","Oto park sistemi","Dar şerit tutma","Ayna katlama","Paralel park asistanı","Far düzenleme"]'),
(1, 'Uzun yolda konforlu sürüş', '#8B6FB0', '→', 'binek', 0, 0, 0, '[]', '["Adaptif cruise kontrol","Masajlı ön koltuklar","Heads-up ekran","Şerit takip asistanı","Gürültü yalıtımı"]'),
(2, 'Zor arazilerde dayanıklı', '#C47A52', '▲', 'binek', 0, 0, 0, '[]', '["4x4 tahrik sistemi","Yüksek sürüş açıklığı","Çekiş kontrol modu","Güçlü süspansiyon"]'),
(3, 'Arka koltuk konforu', '#5FA37A', '⊡', 'binek', 0, 0, 0, '[]', '["Geniş bacak mesafesi","Isıtmalı arka koltuklar","Katlanır koltuk tepsi","Panoramik tavan camı"]'),
(4, 'Çekiş kabiliyeti', '#C9A227', '⊕', 'binek', 0, 1, 0, '[]', '["Karavan çekebilen","Bisiklet taşıyıcı","Tavan taşıyıcı"]'),
(5, 'Bagaj kapısı', '#7A8A99', '⊟', 'binek', 0, 0, 0, '[]', '["Elektrikli bagaj kapısı","Ellersiz kapı açma","Alçak eşik girişi"]'),
(6, 'Kış şartlarına uyumlu', '#6BA8C4', '✦', 'binek', 0, 0, 0, '[]', '["4x4 kış tahrik modu","Isıtmalı cam & aynalar","Kış lastiği uyumlu"]'),
(7, 'Kampa uygun', '#7FA55C', '△', 'binek', 0, 0, 0, '[]', '["Araç içi 230V priz","Güçlü tavan bagajı"]'),
(8, 'Geniş yükleme alanı', '#B08A5F', '◫', 'binek', 0, 0, 0, '[]', '["500L üzeri bagaj","Yassı katlanan koltuk"]'),
(9, 'Yakıt tüketimi', '#4FA095', '◈', 'binek', 1, 0, 0, '[]', '["5L/100km altı","7L/100km altı"]'),
(10, 'Elektrikli kullanım desteği (Hibrit)', '#0072F0', '⚡', 'binek', 0, 0, 1, '[]', '[]'),
(11, '64 renkli aydınlatma', '#9B7FC4', '✧', 'binek', 0, 0, 1, '[]', '[]'),

(100, 'Yükleme-indirme kolaylığı', '#7C8CA1', '↑', 'commercial', 0, 0, 0, '[]', '["Her iki tarafta sürgülü kapı","Arka kapılar 180 derece açılabilen","Arka kapılar 270 derece açılabilen","Açık kasa"]'),
(101, 'Yüksek park kabiliyeti', '#8FA4B8', 'P', 'commercial', 0, 0, 0, '[]', '["180 derece geri görüş kamerası","360 derece geri görüş kamerası","Arka park sensörü","Hem ön hem arka park sensörü"]'),
(102, 'Maksimum taşınabilecek europalet adedi', '#9A9AA4', '▦', 'commercial', 1, 0, 0, '[]', '["1","2","3","4","5"]'),
(103, 'Taşıma kapasitesi (yolcu dahil)', '#C9B79C', '⊕', 'commercial', 1, 0, 0, '[]', '["1 ton altı","1 ton üstü"]'),
(104, 'Yük sabitleme kancaları', '#B0A08C', '⊟', 'commercial', 1, 0, 0, '[]', '["Zeminde","Zeminde ve tavanda"]'),
(105, 'Araç içi güç çıkışı', '#9AAD8A', '⚡', 'commercial', 0, 0, 0, '[]', '["230V güç çıkışı (ev tipi priz)","12V güç çıkışı (çakmaklık girişi)"]'),
(106, 'Mobil ofis / masaya dönüşebilen orta koltuk', '#8B7CA1', '⊡', 'commercial', 0, 0, 1, '[]', '[]'),
(107, 'Tüm köprü ve otoyollardan geçebilen', '#7FA8A0', '→', 'commercial', 0, 0, 1, '[]', '[]'),
(108, 'Sürücü kabininden bağımsız yük bölümü', '#8FA898', '◧', 'commercial', 0, 0, 1, '[]', '[]'),
(109, 'Uzun ve ince yükleri sığdırabilen', '#B98A7A', '↔', 'commercial', 0, 0, 0, '[]', '["3 metreye kadar boru/tel/çubuk sığdırabilen","4 metreye kadar boru/tel/çubuk sığdırabilen","4 metreden uzun boru/tel/çubuk sığabilen"]'),
(110, 'Dar sokaklara rahat giren (küçük dönüş çaplı)', '#A08BB0', '↺', 'commercial', 0, 0, 1, '[]', '[]'),
(111, 'Yolcu Taşımacılığı', '#8B7CA1', '○', 'commercial', 1, 0, 0, '["Yolcu sayısı 8''e kadar","Yolcu sayısı 8 üzeri"]', '["Yolcu sayısı 8''e kadar","Yolcu sayısı 8 üzeri"]');

-- 6. Toyota Modelleri
INSERT OR REPLACE INTO vehicles (id, model_code, name, type, segment, starting_price, powertrain, cardb_image, toyota_url, specs_json, supported_tags_json) VALUES
('corolla-cross', '99940', 'Corolla Cross', 'binek', 'C-SUV', 2075000, 'HYBRID', 'https://img-optimize.toyota-europe.com/ccis/zip/tr/product-token/30d2592e-700a-4720-a092-9c542aa60610/vehicle/99940/width/680/height/383/padding/0,0,0,0/image-quality/70/day-exterior-03_1L6.png', 'https://www.toyota.com.tr/araba-modelleri/corolla-cross-hybrid', '{"bodyType":"SUV","seats":5,"tagline":"Aileler için Hibrit SUV","description":"Yüksek sürüş pozisyonu ve 5. nesil hibrit teknolojisi."}', '["Geniş bacak mesafesi","Panoramik tavan camı","Elektrikli bagaj kapısı","Adaptif cruise kontrol","Şerit takip asistanı","Park sensörleri","Çevre görüş kamerası","500L üzeri bagaj","Elektrikli kullanım desteği (Hibrit)","5L/100km altı","Yedek görüş kamerası","Yassı katlanan koltuk"]'),
('yaris-cross', '98210', 'Yaris Cross', 'binek', 'B-SUV', 1745000, 'HYBRID', 'https://img-optimize.toyota-europe.com/ccis/zip/tr/product-token/d3c91452-21cf-41a4-a1ce-129e5b310d4b/vehicle/98210/width/680/height/383/padding/0,0,0,0/image-quality/70/day-exterior-03_040.png', 'https://www.toyota.com.tr/araba-modelleri/yaris-cross', '{"bodyType":"SUV","seats":5,"tagline":"Şehirli ve Maceracı B-SUV","description":"Kompakt boyutlar ve akıllı 4x4 yeteneği."}', '["Dar alanda rahat park","Park sensörleri","Yedek görüş kamerası","Dar şerit tutma","Ayna katlama","5L/100km altı","Elektrikli kullanım desteği (Hibrit)","Adaptif cruise kontrol","Yüksek sürüş açıklığı","Çekiş kontrol modu"]'),
('c-hr', '103392', 'Toyota C-HR', 'binek', 'Coupe SUV', 1925000, 'HYBRID', 'https://img-optimize.toyota-europe.com/ccis/zip/tr/product-token/a1337de6-7dd7-45b7-816b-dff99650cf8d/vehicle/103392/width/680/height/383/padding/0,0,0,0/image-quality/70/day-exterior-03_M35.png', 'https://www.toyota.com.tr/araba-modelleri/c-hr', '{"bodyType":"Coupe SUV","seats":5,"tagline":"İkonik Tasarım & İleri Teknoloji","description":"Ezber bozan dinamik tasarım ve en son sürüş asistanları."}', '["64 renkli aydınlatma","Adaptif cruise kontrol","Heads-up ekran","Şerit takip asistanı","Elektrikli kullanım desteği (Hibrit)","Panoramik tavan camı","Park sensörleri","Çevre görüş kamerası","5L/100km altı"]'),
('corolla-sedan', '96518', 'Corolla Sedan', 'binek', 'Sedan', 1615000, 'BENZİN | HYBRID', 'https://img-optimize.toyota-europe.com/ccis/zip/tr/product-token/61c63195-8c8f-4deb-b255-a2589cff23a9/vehicle/96518/width/680/height/383/padding/0,0,0,0/image-quality/70/day-exterior-03_040.png', 'https://www.toyota.com.tr/araba-modelleri/corolla-sedan', '{"bodyType":"Sedan","seats":5,"tagline":"Dünyanın En Çok Tercih Edilen Otomobili","description":"Efsanevi dayanıklılık ve düşük yakıt tüketimi."}', '["Geniş bacak mesafesi","Gürültü yalıtımı","Adaptif cruise kontrol","Elektrikli kullanım desteği (Hibrit)","5L/100km altı","7L/100km altı","Park sensörleri","Şerit takip asistanı"]'),
('yaris', '100132', 'Yaris', 'binek', 'Hatchback', 1420000, 'HYBRID', 'https://img-optimize.toyota-europe.com/ccis/zip/tr/product-token/2bf36919-8adf-4fb0-80f0-0da53734988a/vehicle/100132/width/680/height/383/padding/0,0,0,0/image-quality/70/day-exterior-03_040.png', 'https://www.toyota.com.tr/araba-modelleri/yaris', '{"bodyType":"Hatchback","seats":5,"tagline":"Şehrin Enerjisi","description":"Çevik yol tutuşu ve üstün manevra kabiliyeti."}', '["Dar alanda rahat park","5L/100km altı","Elektrikli kullanım desteği (Hibrit)","Yedek görüş kamerası","Park sensörleri","Dar şerit tutma","Ayna katlama"]'),
('rav4', '100411', 'RAV4 Hybrid', 'binek', 'D-SUV', 3280000, 'HYBRID AWD-i', 'https://img-optimize.toyota-europe.com/ccis/zip/pl/product-token/1350d268-6221-4222-acd8-cdaae43be5c4/vehicle/100411/width/680/height/383/padding/0,0,0,0/image-quality/70/day-exterior-03_218.png', 'https://www.toyota.com.tr/araba-modelleri/rav4-hybrid', '{"bodyType":"SUV","seats":5,"tagline":"Güçlü, Yetenekli ve Hibrit Öncüsü","description":"AWD-i akıllı dört çeker sistemi ve 580 litrelik dev bagaj."}', '["4x4 tahrik sistemi","500L üzeri bagaj","Elektrikli bagaj kapısı","Karavan çekebilen","Geniş bacak mesafesi","Elektrikli kullanım desteği (Hibrit)","Adaptif cruise kontrol","Şerit takip asistanı","4x4 kış tahrik modu","Isıtmalı cam & aynalar","Panoramik tavan camı"]'),
('camry', '5e195cdc', 'Camry', 'binek', 'E-Sedan', 4150000, 'HYBRID', 'https://img-optimize.toyota-europe.com/ccis/zip/pl/product-token/18355c02-1291-41bc-b632-b0d10aadc1ce/vehicle/5e195cdc-de88-42ef-8aca-b66ac3f0a0ff/width/680/height/383/padding/0,0,0,0/image-quality/70/day-exterior-03_4y6.png', 'https://www.toyota.com.tr/araba-modelleri/camry', '{"bodyType":"Sedan","seats":5,"tagline":"Prestij ve Üst Düzey Konfor","description":"Zarif tasarım, lüks iç mekan ve sessiz kabin."}', '["Geniş bacak mesafesi","Gürültü yalıtımı","Masajlı ön koltuklar","Isıtmalı arka koltuklar","Adaptif cruise kontrol","Heads-up ekran","Elektrikli kullanım desteği (Hibrit)"]'),
('land-cruiser-prado', '101581', 'Land Cruiser Prado', 'binek', 'Off-Road SUV', 6450000, 'DİZEL 4x4', 'https://img-optimize.toyota-europe.com/ccis/zip/tr/product-token/9247e721-2109-483c-9c76-b55a9d327c65/vehicle/101581/width/680/height/383/padding/0,0,0,0/image-quality/70/day-exterior-03_4V8.png', 'https://www.toyota.com.tr/araba-modelleri/land-cruiser-prado', '{"bodyType":"SUV","seats":7,"tagline":"Efsanevi Arazi İkonu","description":"70 yılı aşkın efsane miras ve durdurulamaz güç."}', '["4x4 tahrik sistemi","Yüksek sürüş açıklığı","Çekiş kontrol modu","Güçlü süspansiyon","Karavan çekebilen","500L üzeri bagaj","4x4 kış tahrik modu","Isıtmalı cam & aynalar"]'),
('hilux', '102759', 'Hilux', 'commercial', 'Pick-Up', 1980000, 'DİZEL 4x4', 'https://img-optimize.toyota-europe.com/ccis/zip/tr/product-token/796893e8-e0dd-49b7-addd-c3b4cb803b41/vehicle/102759/width/680/height/383/padding/0,0,0,0/image-quality/70/day-exterior-03_5C7.png', 'https://www.toyota.com.tr/araba-modelleri/hilux', '{"bodyType":"Pick-up","seats":5,"tagline":"Yenilmez ve Efsanevi Dayanıklılık","description":"1 ton yük kapasitesi ve 3.5 ton çekme gücü."}', '["Açık kasa","4x4 tahrik sistemi","Karavan çekebilen","1 ton üstü","Zeminde ve tavanda","Zor arazilerde dayanıklı"]'),
('proace-city', '82131', 'Proace City Cargo', 'commercial', 'Hafif Ticari Van', 1190000, 'DİZEL', 'https://img-optimize.toyota-europe.com/ccis/zip/tr/product-token/e6569396-c137-4c51-8e5a-d4f70f44f110/vehicle/82131/width/680/height/383/padding/0,0,0,0/image-quality/70/day-exterior-03_EPR.png', 'https://www.toyota.com.tr/araba-modelleri/proace-city-cargo', '{"bodyType":"Van","seats":2,"tagline":"İşinizin Çevik ve Güvenilir Ortağı","description":"Geniş yükleme hacmi ve akıllı Smart Cargo sistemi."}', '["Her iki tarafta sürgülü kapı","Arka kapılar 180 derece açılabilen","180 derece geri görüş kamerası","Arka park sensörü","Mobil ofis / masaya dönüşebilen orta koltuk","Tüm köprü ve otoyollardan geçebilen","Sürücü kabininden bağımsız yük bölümü","3 metreye kadar boru/tel/çubuk sığdırabilen","Dar sokaklara rahat giren (küçük dönüş çaplı)"]'),
('proace-city-verso', '82131', 'Proace City Verso', 'binek-ticari', 'Kombi', 1480000, 'DİZEL', 'https://img-optimize.toyota-europe.com/ccis/zip/tr/product-token/e6569396-c137-4c51-8e5a-d4f70f44f110/vehicle/82131/width/680/height/383/padding/0,0,0,0/image-quality/70/day-exterior-03_EPR.png', 'https://www.toyota.com.tr/araba-modelleri/proace-city-verso', '{"bodyType":"Kombi","seats":5,"tagline":"Hem İşiniz Hem Aileniz İçin","description":"Binek araç konforu ve ticari fonksiyonellik."}', '["Geniş bacak mesafesi","Katlanır koltuk tepsi","Elektrikli bagaj kapısı","500L üzeri bagaj","Yassı katlanan koltuk","Her iki tarafta sürgülü kapı","Arka park sensörü"]'),
('proace', '100855', 'Proace Cargo', 'commercial', 'Orta Boy Van', 1650000, 'DİZEL', 'https://img-optimize.toyota-europe.com/ccis/zip/tr/product-token/4abf7b94-ee9f-4b55-836c-f68040d9e1f8/vehicle/100855/width/680/height/383/padding/0,0,0,0/image-quality/70/day-exterior-03_EPR.png', 'https://www.toyota.com.tr/araba-modelleri/proace-cargo', '{"bodyType":"Panelvan","seats":3,"tagline":"Büyük İşlerin Güçlü Çözümü","description":"Geniş taşıma hacmi ve 3 europalet kapasitesi."}', '["Arka kapılar 180 derece açılabilen","Arka kapılar 270 derece açılabilen","1 ton üstü","Zeminde ve tavanda","Sürücü kabininden bağımsız yük bölümü","4 metreye kadar boru/tel/çubuk sığdırabilen"]'),
('proace-verso', '96216', 'Proace Verso', 'commercial', 'Minibüs & VIP Shuttle', 2490000, 'DİZEL', 'https://img-optimize.toyota-europe.com/ccis/zip/tr/product-token/40309f75-11b2-443d-bf3c-d26f99103885/vehicle/96216/width/680/height/383/padding/0,0,0,0/image-quality/70/day-exterior-03_KKJ.png', 'https://www.toyota.com.tr/araba-modelleri/proace-verso', '{"bodyType":"Minibüs","seats":9,"tagline":"Lüks Yolcu Taşımacılığı","description":"9 kişilik oturma kapasitesi ve VIP transfer konforu."}', '["Yolcu sayısı 8 üzeri","Yolcu sayısı 8''e kadar","Geniş bacak mesafesi","Isıtmalı arka koltuklar","Adaptif cruise kontrol"]');

-- 7. Eşleştirme Kuralları
INSERT OR REPLACE INTO matching_rules (source_type, source_id, source_label, vehicle_id, weight, reason_badge) VALUES
('question', 'lifestyle:Şehir Hayatı', 'Şehir Hayatı', 'yaris', 30, 'Şehir İçi Kompakt Boyutlar'),
('question', 'lifestyle:Şehir Hayatı', 'Şehir Hayatı', 'yaris-cross', 25, 'Yüksek Sürüş Pozisyonu'),
('question', 'lifestyle:Şehir Hayatı', 'Şehir Hayatı', 'corolla-sedan', 20, 'Kullanışlı Şehir Sedan'),
('question', 'lifestyle:Şehir Hayatı', 'Şehir Hayatı', 'c-hr', 20, 'Çarpıcı Şehir Tasarımı'),

('question', 'lifestyle:Macera/Doğa Aktiviteleri', 'Macera/Doğa Aktiviteleri', 'rav4', 35, 'AWD-i Akıllı 4 Çeker'),
('question', 'lifestyle:Macera/Doğa Aktiviteleri', 'Macera/Doğa Aktiviteleri', 'hilux', 35, 'Zorlu Arazi Lideri'),
('question', 'lifestyle:Macera/Doğa Aktiviteleri', 'Macera/Doğa Aktiviteleri', 'land-cruiser-prado', 40, 'Efsanevi Arazi Yeteneği'),
('question', 'lifestyle:Macera/Doğa Aktiviteleri', 'Macera/Doğa Aktiviteleri', 'corolla-cross', 20, 'Hafta Sonu Kamp Uyumu'),

('question', 'lifestyle:Aile ve Çocuklu Yaşam', 'Aile ve Çocuklu Yaşam', 'corolla-cross', 30, 'Geniş Aile Hacmi'),
('question', 'lifestyle:Aile ve Çocuklu Yaşam', 'Aile ve Çocuklu Yaşam', 'rav4', 30, '580L Devasa Bagaj'),
('question', 'lifestyle:Aile ve Çocuklu Yaşam', 'Aile ve Çocuklu Yaşam', 'corolla-sedan', 25, 'Aile Sedan Konforu'),
('question', 'lifestyle:Aile ve Çocuklu Yaşam', 'Aile ve Çocuklu Yaşam', 'proace-city-verso', 35, 'Geniş Aile & Çocuklu Kullanım'),

('question', 'seats:1-2 Kişi', '1-2 Kişi', 'yaris', 25, 'Kompakt Boyut'),
('question', 'seats:1-2 Kişi', '1-2 Kişi', 'c-hr', 25, 'Dinamik Coupe SUV'),
('question', 'seats:3-4 Kişi', '3-4 Kişi', 'corolla-sedan', 25, 'Geniş Yaşam Alanı'),
('question', 'seats:3-4 Kişi', '3-4 Kişi', 'corolla-cross', 25, 'Geniş C-SUV Alanı'),
('question', 'seats:3-4 Kişi', '3-4 Kişi', 'yaris-cross', 20, 'Pratik İç Hacim'),
('question', 'seats:5 ve üzeri', '5 ve üzeri', 'proace-verso', 40, '9 Kişilik Yolcu Kapasitesi'),
('question', 'seats:5 ve üzeri', '5 ve üzeri', 'proace-city-verso', 30, '7 Kişilik Geniş Hacim'),
('question', 'seats:5 ve üzeri', '5 ve üzeri', 'land-cruiser-prado', 30, '7 Kişilik Lüks Arazi'),

('question', 'usage:Dağıtım', 'Dağıtım', 'proace-city', 35, 'Kargo & Şehir İçi Teslimat'),
('question', 'usage:Dağıtım', 'Dağıtım', 'proace', 30, 'Büyük Hacimli Yükleme'),
('question', 'usage:Teknik Servis', 'Teknik Servis', 'proace-city', 35, 'Mobil Atölye & Raf Uyumu'),
('question', 'usage:Yolcu Taşımacılığı', 'Yolcu Taşımacılığı', 'proace-verso', 40, 'VIP & Turizm Transferi'),
('question', 'usage:Yolcu Taşımacılığı', 'Yolcu Taşımacılığı', 'proace-city-verso', 30, 'Konforlu Shuttle'),
('question', 'usage:Yapı/Onarım', 'Yapı/Onarım', 'hilux', 40, '1 Ton İstiap & 3.5 Ton Çekme'),
('question', 'usage:Yapı/Onarım', 'Yapı/Onarım', 'proace', 30, 'Uzun Malzeme Taşıma'),
('question', 'usage:Sanayi/Üretim', 'Sanayi/Üretim', 'proace', 35, 'Europalet Taşıma Kapasitesi'),

('category', 'cat:0:Dar alanda rahat park', 'Dar alanda rahat park', 'yaris', 30, 'Kompakt Boyut & Kolay Park'),
('category', 'cat:0:Dar alanda rahat park', 'Dar alanda rahat park', 'yaris-cross', 25, 'Geri Görüş & Park Sensörü'),
('category', 'cat:0:Dar alanda rahat park', 'Dar alanda rahat park', 'c-hr', 20, 'Otomatik Park Asistanı'),

('category', 'cat:1:Uzun yolda konforlu sürüş', 'Uzun yolda konforlu sürüş', 'camry', 35, 'Premium Sedan Konforu'),
('category', 'cat:1:Uzun yolda konforlu sürüş', 'Uzun yolda konforlu sürüş', 'rav4', 30, 'Adaptif Cruise & Şerit Takip'),
('category', 'cat:1:Uzun yolda konforlu sürüş', 'Uzun yolda konforlu sürüş', 'corolla-sedan', 25, 'Sessiz Kabin Yalıtımı'),

('category', 'cat:2:Zor arazilerde dayanıklı', 'Zor arazilerde dayanıklı', 'hilux', 40, '4x4 Ağır Arazi Şasisi'),
('category', 'cat:2:Zor arazilerde dayanıklı', 'Zor arazilerde dayanıklı', 'land-cruiser-prado', 40, 'Crawl Control & Kilitli Dif.'),
('category', 'cat:2:Zor arazilerde dayanıklı', 'Zor arazilerde dayanıklı', 'rav4', 25, 'Trail Modu & AWD'),

('category', 'cat:3:Arka koltuk konforu', 'Arka koltuk konforu', 'camry', 35, 'Geniş Arka Diz Mesafesi'),
('category', 'cat:3:Arka koltuk konforu', 'Arka koltuk konforu', 'corolla-sedan', 25, 'Ergonomik Arka Koltuklar'),
('category', 'cat:3:Arka koltuk konforu', 'Arka koltuk konforu', 'proace-verso', 30, 'Kaptan Koltuk Düzeni'),

('category', 'cat:4:Çekiş kabiliyeti', 'Çekiş kabiliyeti', 'hilux', 40, '3500 kg Çekme Gücü'),
('category', 'cat:4:Çekiş kabiliyeti', 'Çekiş kabiliyeti', 'land-cruiser-prado', 40, 'Karavan & Römork Ustası'),
('category', 'cat:4:Çekiş kabiliyeti', 'Çekiş kabiliyeti', 'rav4', 25, '1650 kg Çekiş Kapasitesi'),

('category', 'cat:8:Geniş yükleme alanı', 'Geniş yükleme alanı', 'corolla-cross', 30, '436L Geniş Bagaj'),
('category', 'cat:8:Geniş yükleme alanı', 'Geniş yükleme alanı', 'rav4', 35, '580L Elektrikli Bagaj'),
('category', 'cat:8:Geniş yükleme alanı', 'Geniş yükleme alanı', 'proace-city', 35, '3.8 m³ Kargo Hacmi'),

('category', 'cat:9:Yakıt tüketimi', 'Yakıt tüketimi (5L altı)', 'yaris', 35, '3.8L / 100km Tüketim'),
('category', 'cat:9:Yakıt tüketimi', 'Yakıt tüketimi (5L altı)', 'corolla-sedan', 30, '4.4L / 100km Hibrit'),
('category', 'cat:9:Yakıt tüketimi', 'Yakıt tüketimi (5L altı)', 'yaris-cross', 25, '4.5L / 100km Hibrit'),
('category', 'cat:9:Yakıt tüketimi', 'Yakıt tüketimi (5L altı)', 'c-hr', 25, '4.8L / 100km Tüketim'),

('category', 'cat:10:Elektrikli kullanım desteği (Hibrit)', 'Hibrit', 'corolla-sedan', 25, '5. Nesil Hibrit Motor'),
('category', 'cat:10:Elektrikli kullanım desteği (Hibrit)', 'Hibrit', 'yaris', 25, 'Kendini Şarj Eden Hibrit'),
('category', 'cat:10:Elektrikli kullanım desteği (Hibrit)', 'Hibrit', 'c-hr', 25, 'Yeni Nesil Hibrit Gücü'),
('category', 'cat:10:Elektrikli kullanım desteği (Hibrit)', 'Hibrit', 'corolla-cross', 25, 'Güçlü Hibrit Dinamizmi'),
('category', 'cat:10:Elektrikli kullanım desteği (Hibrit)', 'Hibrit', 'rav4', 25, '222 HP Hibrit Güç');
