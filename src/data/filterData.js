// Filter categories and questionnaire definitions

export const MAX_TOTAL_SELECTIONS = 15;
export const MAX_CATEGORY_SELECTIONS = 2;

// Binek Categories
export const BINEK_CATEGORIES = [
  {
    id: 0,
    name: 'Dar alanda rahat park',
    color: '#5B8DBF',
    icon: 'P',
    options: [
      'Yedek görüş kamerası',
      'Park sensörleri',
      'Çevre görüş kamerası',
      'Oto park sistemi',
      'Dar şerit tutma',
      'Ayna katlama',
      'Paralel park asistanı',
      'Far düzenleme'
    ]
  },
  {
    id: 1,
    name: 'Uzun yolda konforlu sürüş',
    color: '#8B6FB0',
    icon: '→',
    options: [
      'Adaptif cruise kontrol',
      'Masajlı ön koltuklar',
      'Heads-up ekran',
      'Şerit takip asistanı',
      'Gürültü yalıtımı'
    ]
  },
  {
    id: 2,
    name: 'Zor arazilerde dayanıklı',
    color: '#C47A52',
    icon: '▲',
    options: [
      '4x4 tahrik sistemi',
      'Yüksek sürüş açıklığı',
      'Çekiş kontrol modu',
      'Güçlü süspansiyon'
    ]
  },
  {
    id: 3,
    name: 'Arka koltuk konforu',
    color: '#5FA37A',
    icon: '⊡',
    options: [
      'Geniş bacak mesafesi',
      'Isıtmalı arka koltuklar',
      'Katlanır koltuk tepsi',
      'Panoramik tavan camı'
    ]
  },
  {
    id: 4,
    name: 'Çekiş kabiliyeti',
    color: '#C9A227',
    icon: '⊕',
    hasTow: true,
    options: [
      'Karavan çekebilen',
      'Bisiklet taşıyıcı',
      'Tavan taşıyıcı'
    ]
  },
  {
    id: 5,
    name: 'Bagaj kapısı',
    color: '#7A8A99',
    icon: '⊟',
    options: [
      'Elektrikli bagaj kapısı',
      'Ellersiz kapı açma',
      'Alçak eşik girişi'
    ]
  },
  {
    id: 6,
    name: 'Kış şartlarına uyumlu',
    color: '#6BA8C4',
    icon: '✦',
    options: [
      '4x4 kış tahrik modu',
      'Isıtmalı cam & aynalar',
      'Kış lastiği uyumlu'
    ]
  },
  {
    id: 7,
    name: 'Kampa uygun',
    color: '#7FA55C',
    icon: '△',
    options: [
      'Araç içi 230V priz',
      'Güçlü tavan bagajı'
    ]
  },
  {
    id: 8,
    name: 'Geniş yükleme alanı',
    color: '#B08A5F',
    icon: '◫',
    options: [
      '500L üzeri bagaj',
      'Yassı katlanan koltuk'
    ]
  },
  {
    id: 9,
    name: 'Yakıt tüketimi',
    color: '#4FA095',
    icon: '◈',
    radio: true,
    options: [
      '5L/100km altı',
      '7L/100km altı'
    ]
  },
  {
    id: 10,
    name: 'Elektrikli kullanım desteği (Hibrit)',
    color: '#0072F0',
    icon: '⚡',
    noOpts: true,
    options: []
  },
  {
    id: 11,
    name: '64 renkli aydınlatma',
    color: '#9B7FC4',
    icon: '✧',
    noOpts: true,
    options: []
  }
];

// Commercial Categories function based on Business Type (from Ticari Excel)
export function getCommercialCategories(businessType) {
  const cEasyLoad = {
    id: 100,
    name: 'Yükleme-indirme kolaylığı',
    color: '#7C8CA1',
    icon: '↑',
    options: [
      'Her iki tarafta sürgülü kapı',
      'Arka kapılar 180 derece açılabilen',
      'Arka kapılar 270 derece açılabilen',
      'Açık kasa'
    ]
  };

  const cHighPark = {
    id: 101,
    name: 'Yüksek park kabiliyeti',
    color: '#8FA4B8',
    icon: 'P',
    options: [
      '180 derece geri görüş kamerası',
      '360 derece geri görüş kamerası',
      'Arka park sensörü',
      'Hem ön hem arka park sensörü'
    ]
  };

  const cPallet = {
    id: 102,
    name: 'Maksimum taşınabilecek europalet adedi',
    color: '#9A9AA4',
    icon: '▦',
    radio: true,
    options: ['1', '2', '3', '4', '5']
  };

  const cPayload = {
    id: 103,
    name: 'Taşıma kapasitesi (yolcu dahil)',
    color: '#C9B79C',
    icon: '⊕',
    radio: true,
    options: ['1 ton altı', '1 ton üstü']
  };

  const cHooks = {
    id: 104,
    name: 'Yük sabitleme kancaları',
    color: '#B0A08C',
    icon: '⊟',
    radio: true,
    options: ['Zeminde', 'Zeminde ve tavanda']
  };

  const cPower = {
    id: 105,
    name: 'Araç içi güç çıkışı',
    color: '#9AAD8A',
    icon: '⚡',
    options: [
      '230V güç çıkışı (ev tipi priz)',
      '12V güç çıkışı (çakmaklık girişi)'
    ]
  };

  const cMobileOffice = {
    id: 106,
    name: 'Mobil ofis / masaya dönüşebilen orta koltuk',
    color: '#8B7CA1',
    icon: '⊡',
    noOpts: true,
    options: []
  };

  const cBridges = {
    id: 107,
    name: 'Tüm köprü ve otoyollardan geçebilen',
    color: '#7FA8A0',
    icon: '→',
    noOpts: true,
    options: []
  };

  const cSeparateCabin = {
    id: 108,
    name: 'Sürücü kabininden bağımsız yük bölümü',
    color: '#8FA898',
    icon: '◧',
    noOpts: true,
    options: []
  };

  const cLongCargo = {
    id: 109,
    name: 'Uzun ve ince yükleri sığdırabilen',
    color: '#B98A7A',
    icon: '↔',
    options: [
      '3 metreye kadar boru/tel/çubuk sığdırabilen',
      '4 metreye kadar boru/tel/çubuk sığdırabilen',
      '4 metreden uzun boru/tel/çubuk sığabilen'
    ]
  };

  const cNarrowStreets = {
    id: 110,
    name: 'Dar sokaklara rahat giren (küçük dönüş çaplı)',
    color: '#A08BB0',
    icon: '↺',
    noOpts: true,
    options: []
  };

  const cPassengerTransport = {
    id: 111,
    name: 'Yolcu Taşımacılığı',
    color: '#8B7CA1',
    icon: '○',
    radio: true,
    exclusivePair: ["Yolcu sayısı 8'e kadar", 'Yolcu sayısı 8 üzeri'],
    options: ["Yolcu sayısı 8'e kadar", 'Yolcu sayısı 8 üzeri']
  };

  switch (businessType) {
    case '__all__':
      return [cEasyLoad, cHighPark, cPower, cPallet, cPayload, cHooks, cLongCargo, cMobileOffice, cSeparateCabin, cBridges, cNarrowStreets];
    case 'Dağıtım':
      return [cEasyLoad, cHighPark, cPallet, cPayload, cHooks, cPower, cMobileOffice, cSeparateCabin, cBridges];
    case 'Teknik Servis':
      return [cEasyLoad, cHighPark, cPallet, cPayload, cHooks, cPower, cMobileOffice, cBridges];
    case 'Yolcu Taşımacılığı':
      return [cPassengerTransport];
    case 'Yapı/Onarım':
      return [cEasyLoad, cLongCargo, cHighPark, cPallet, cPayload, cHooks, cPower, cMobileOffice, cBridges];
    case 'Sanayi/Üretim':
      return [cEasyLoad, cLongCargo, cHighPark, cPallet, cPayload, cHooks, cPower, cMobileOffice, cBridges];
    case 'Diğer':
      return [cEasyLoad, cLongCargo, cHighPark, cPallet, cPayload, cHooks, cPower, cMobileOffice, cSeparateCabin, cBridges, cNarrowStreets];
    default:
      return [cEasyLoad, cHighPark, cPallet, cPayload, cHooks, cPower, cMobileOffice, cBridges];
  }
}

// Commercial business types from Excel
export const COMMERCIAL_BUSINESS_TYPES = [
  { t: 'Dağıtım', d: 'Kargo · Kurye · Şehir içi teslimat' },
  { t: 'Teknik Servis', d: 'Beyaz eşya · Kurulum · Bakım-onarım' },
  { t: 'Yolcu Taşımacılığı', d: 'Transfer · Servis · Turizm' },
  { t: 'Yapı/Onarım', d: 'İnşaat · Tesisat · Tadilat' },
  { t: 'Sanayi/Üretim', d: 'Fabrika · Atölye · Yük taşıma' },
  { t: 'Diğer', d: 'Farklı bir kullanım' }
];

// Profile Questions
export const INTRO_QUESTION = {
  id: 'intro',
  title: 'Bu aracı hangi amaçla kullanacaksınız?',
  sub: 'Size en uygun kategoriyi seçelim.',
  select: 'single',
  opts: [
    { t: 'Binek Araç', d: 'Sedan · SUV · Hatchback' },
    { t: 'Ticari Araç', d: 'Kamyonet · Minibüs · Van' },
    { t: 'Her İkisi de', d: 'Size en uygun aracı birlikte bulalım' }
  ]
};

export const QUESTION_SEATS = {
  id: 'seats',
  title: 'Kaç kişilik bir araç arıyorsunuz?',
  sub: 'En sık birlikte yolculuk ettiğiniz kişi sayısını seçin.',
  select: 'single',
  opts: [
    { t: '1-2 Kişi', d: 'Tek başına veya iki kişi' },
    { t: '3-4 Kişi', d: 'Çiftler ve küçük aileler için' },
    { t: '5 ve üzeri', d: 'Kalabalık aileler veya gruplar için' }
  ]
};

export const QUESTION_LIFESTYLE = {
  id: 'lifestyle',
  title: 'Hangisi yaşam tarzınızı en iyi tanımlar?',
  sub: 'En sık yaptığınız yolculukları düşünün. En fazla 2 seçim yapabilirsiniz.',
  select: 'multi',
  max: 2,
  opts: [
    { t: 'Şehir Hayatı', d: 'Trafik · Park · Kısa mesafe' },
    { t: 'Macera/Doğa Aktiviteleri', d: 'Uzun yol · Arazi · Hafta sonu' },
    { t: 'Aile ve Çocuklu Yaşam', d: 'Konforlu yolculuk · Geniş bagaj · Kolay biniş' }
  ]
};

export const QUESTION_CLOSER = {
  id: 'closer',
  title: 'Hangisi size daha yakın?',
  sub: 'Araç kullanım alışkanlığınıza en yakın olanı seçin.',
  select: 'single',
  opts: [
    { t: 'İlk araç deneyimi', d: '' },
    { t: 'Günlük yaşam ve aktif kullanım', d: '' },
    { t: 'Aile ve çok yönlü kullanım', d: '' },
    { t: 'Erişilebilirlik', d: '' }
  ]
};

export const QUESTION_USAGE = {
  id: 'usage',
  title: 'Aracı nerede kullanacaksınız?',
  sub: 'İşinizi en iyi tanımlayan alanı seçin.',
  select: 'single',
  opts: COMMERCIAL_BUSINESS_TYPES
};

export const PROFILE_STEPS_BY_CATEGORY = {
  'Binek Araç': [QUESTION_SEATS, QUESTION_LIFESTYLE, QUESTION_CLOSER],
  'Ticari Araç': [QUESTION_USAGE],
  'Her İkisi de': [QUESTION_SEATS, QUESTION_LIFESTYLE, QUESTION_USAGE, QUESTION_CLOSER]
};

export function getPersonaTitle(lifestyleSelections = []) {
  if (lifestyleSelections.includes('Macera/Doğa Aktiviteleri')) return 'Rota Dışı Ruh';
  if (lifestyleSelections.includes('Aile ve Çocuklu Yaşam')) return 'Aile Rotacısı';
  if (lifestyleSelections.includes('Şehir Hayatı')) return 'Şehirli Kaşif';
  return 'Uzun Yol Ustası';
}

// Ticker keywords for animated hero background
export const TICKER_KEYWORDS = [
  'Park sensörleri',
  'Isıtmalı koltuk',
  'Geniş bagaj hacmi',
  '4 çeker',
  'Arka klima ünitesi',
  'Otomatik bagaj',
  'Yokuş kalkış desteği',
  'Panoramik tavan camı',
  'Çevre görüş kamerası',
  'Kablosuz şarj'
];

export const TICKER_LANES_DESKTOP = [
  { words: [TICKER_KEYWORDS[0], TICKER_KEYWORDS[1], TICKER_KEYWORDS[2], TICKER_KEYWORDS[3]], top: '40%', scale: 0.72, blur: 2, opacity: 0.6, dur: 90, dir: -1 },
  { words: [TICKER_KEYWORDS[4], TICKER_KEYWORDS[5], TICKER_KEYWORDS[6]], top: '54%', scale: 0.86, blur: 1, opacity: 0.85, dur: 60, dir: 1 },
  { words: [TICKER_KEYWORDS[7], TICKER_KEYWORDS[8], TICKER_KEYWORDS[9]], top: '67%', scale: 1, blur: 0, opacity: 1, dur: 45, dir: -1 }
];

export const TICKER_LANES_MOBILE = [
  { words: [TICKER_KEYWORDS[0], TICKER_KEYWORDS[1], TICKER_KEYWORDS[2], TICKER_KEYWORDS[3], TICKER_KEYWORDS[4]], top: '46%', scale: 0.72, blur: 2, opacity: 0.6, dur: 90, dir: -1 },
  { words: [TICKER_KEYWORDS[5], TICKER_KEYWORDS[6], TICKER_KEYWORDS[7], TICKER_KEYWORDS[8], TICKER_KEYWORDS[9]], top: '62%', scale: 1, blur: 0, opacity: 1, dur: 50, dir: 1 }
];
