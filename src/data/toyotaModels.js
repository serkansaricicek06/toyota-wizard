// Toyota Vehicles Database with Cardb Image pipeline integration
export const TOYOTA_MODELS = [
  {
    id: 'corolla-cross',
    name: 'Corolla Cross',
    fullName: 'Corolla Cross Hybrid',
    type: 'binek',
    bodyType: 'SUV',
    powertrain: 'HYBRID',
    seats: 5,
    tagline: 'Aileler için Hibrit SUV',
    description: 'Yüksek sürüş pozisyonu, geniş iç hacim ve 5. nesil hibrit teknolojisiyle mükemmel aile SUV deneyimi.',
    cardbToken: '30d2592e-700a-4720-a092-9c542aa60610',
    vehicleId: '99940',
    colorCode: '1L6',
    imageUrl: 'https://img-optimize.toyota-europe.com/ccis/zip/tr/product-token/30d2592e-700a-4720-a092-9c542aa60610/vehicle/99940/width/680/height/383/padding/0,0,0,0/image-quality/70/day-exterior-03_1L6.png',
    fallbackImageUrl: 'https://tarot-power-85236521.figma.site/assets/image-bXm1XVZR.png',
    url: 'https://www.toyota.com.tr/araba-modelleri/corolla-cross-hybrid',
    startingPrice: '2.075.000 TL',
    tags: [
      'Geniş bacak mesafesi', 'Panoramik tavan camı', 'Elektrikli bagaj kapısı', 
      'Adaptif cruise kontrol', 'Şerit takip asistanı', 'Park sensörleri', 
      'Çevre görüş kamerası', '500L üzeri bagaj', 'Elektrikli kullanım desteği (Hibrit)',
      '5L/100km altı', 'Yedek görüş kamerası', 'Yassı katlanan koltuk'
    ]
  },
  {
    id: 'yaris-cross',
    name: 'Yaris Cross',
    fullName: 'Yaris Cross Hybrid',
    type: 'binek',
    bodyType: 'SUV',
    powertrain: 'HYBRID',
    seats: 5,
    tagline: 'Şehirli ve Maceracı B-SUV',
    description: 'Kompakt boyutlar, yüksek sürüş ve akıllı 4x4 yeteneği ile hem şehirde hem doğada özgürlük.',
    cardbToken: 'd3c91452-21cf-41a4-a1ce-129e5b310d4b',
    vehicleId: '98210',
    colorCode: '040',
    imageUrl: 'https://img-optimize.toyota-europe.com/ccis/zip/tr/product-token/d3c91452-21cf-41a4-a1ce-129e5b310d4b/vehicle/98210/width/680/height/383/padding/0,0,0,0/image-quality/70/day-exterior-03_040.png',
    fallbackImageUrl: 'https://tarot-power-85236521.figma.site/assets/image-1-1A_kvH5X.png',
    url: 'https://www.toyota.com.tr/araba-modelleri/yaris-cross',
    startingPrice: '1.745.000 TL',
    tags: [
      'Dar alanda rahat park', 'Park sensörleri', 'Yedek görüş kamerası', 
      'Dar şerit tutma', 'Ayna katlama', '5L/100km altı', 
      'Elektrikli kullanım desteği (Hibrit)', 'Adaptif cruise kontrol',
      'Yüksek sürüş açıklığı', 'Çekiş kontrol modu'
    ]
  },
  {
    id: 'c-hr',
    name: 'Toyota C-HR',
    fullName: 'Toyota C-HR Hybrid',
    type: 'binek',
    bodyType: 'Coupe SUV',
    powertrain: 'HYBRID',
    seats: 5,
    tagline: 'İkonik Tasarım & İleri Teknoloji',
    description: 'Ezber bozan dinamik tasarımı, 64 renkli ambiyans aydınlatması ve en son sürüş asistanları.',
    cardbToken: 'a1337de6-7dd7-45b7-816b-dff99650cf8d',
    vehicleId: '103392',
    colorCode: 'M35',
    imageUrl: 'https://img-optimize.toyota-europe.com/ccis/zip/tr/product-token/a1337de6-7dd7-45b7-816b-dff99650cf8d/vehicle/103392/width/680/height/383/padding/0,0,0,0/image-quality/70/day-exterior-03_M35.png',
    url: 'https://www.toyota.com.tr/araba-modelleri/c-hr',
    startingPrice: '1.925.000 TL',
    tags: [
      '64 renkli aydınlatma', 'Adaptif cruise kontrol', 'Heads-up ekran', 
      'Şerit takip asistanı', 'Elektrikli kullanım desteği (Hibrit)', 
      'Panoramik tavan camı', 'Park sensörleri', 'Çevre görüş kamerası', 
      '5L/100km altı'
    ]
  },
  {
    id: 'corolla-sedan',
    name: 'Corolla Sedan',
    fullName: 'Corolla Sedan',
    type: 'binek',
    bodyType: 'Sedan',
    powertrain: 'BENZİN | HYBRID',
    seats: 5,
    tagline: 'Dünyanın En Çok Tercih Edilen Otomobili',
    description: 'Efsanevi dayanıklılık, ferah kabin, üstün sürüş konforu ve düşük yakıt tüketimi.',
    cardbToken: '61c63195-8c8f-4deb-b255-a2589cff23a9',
    vehicleId: '96518',
    colorCode: '040',
    imageUrl: 'https://img-optimize.toyota-europe.com/ccis/zip/tr/product-token/61c63195-8c8f-4deb-b255-a2589cff23a9/vehicle/96518/width/680/height/383/padding/0,0,0,0/image-quality/70/day-exterior-03_040.png',
    url: 'https://www.toyota.com.tr/araba-modelleri/corolla-sedan',
    startingPrice: '1.615.000 TL',
    tags: [
      'Geniş bacak mesafesi', 'Gürültü yalıtımı', 'Adaptif cruise kontrol',
      'Elektrikli kullanım desteği (Hibrit)', '5L/100km altı', 
      '7L/100km altı', 'Park sensörleri', 'Şerit takip asistanı'
    ]
  },
  {
    id: 'yaris',
    name: 'Yaris',
    fullName: 'Yaris Hybrid',
    type: 'binek',
    bodyType: 'Hatchback',
    powertrain: 'HYBRID',
    seats: 5,
    tagline: 'Şehrin Enerjisi',
    description: 'Dar sokaklarda kıvrak, park yeri bulması kolay, sınıfının en düşük yakıt tüketimine sahip hibrit.',
    cardbToken: '2bf36919-8adf-4fb0-80f0-0da53734988a',
    vehicleId: '100132',
    colorCode: '040',
    imageUrl: 'https://img-optimize.toyota-europe.com/ccis/zip/tr/product-token/2bf36919-8adf-4fb0-80f0-0da53734988a/vehicle/100132/width/680/height/383/padding/0,0,0,0/image-quality/70/day-exterior-03_040.png',
    url: 'https://www.toyota.com.tr/araba-modelleri/yaris',
    startingPrice: '1.435.000 TL',
    tags: [
      'Dar alanda rahat park', 'Park sensörleri', 'Yedek görüş kamerası',
      '5L/100km altı', 'Elektrikli kullanım desteği (Hibrit)', 'Ayna katlama'
    ]
  },
  {
    id: 'rav4',
    name: 'Yeni RAV4',
    fullName: 'Yeni RAV4 Hybrid',
    type: 'binek',
    bodyType: 'SUV',
    powertrain: 'HYBRID',
    seats: 5,
    tagline: 'Öncü ve Güçlü Hibrit SUV',
    description: 'Gelişmiş elektrikli 4x4 (AWD-i) çekiş sistemi, 222 HP güç ve zorlu doğa koşullarına hazır.',
    cardbToken: '1350d268-6221-4222-acd8-cdaae43be5c4',
    vehicleId: '100411',
    colorCode: '218',
    imageUrl: 'https://img-optimize.toyota-europe.com/ccis/zip/pl/product-token/1350d268-6221-4222-acd8-cdaae43be5c4/vehicle/100411/width/680/height/383/padding/0,0,0,0/image-quality/70/day-exterior-03_218.png',
    url: 'https://www.toyota.com.tr/araba-modelleri/yeni-rav4-yakinda',
    startingPrice: '3.150.000 TL',
    tags: [
      '4x4 tahrik sistemi', 'Yüksek sürüş açıklığı', 'Çekiş kontrol modu', 
      'Güçlü süspansiyon', 'Karavan çekebilen', 'Araç içi 230V priz', 
      'Güçlü tavan bagajı', '4x4 kış tahrik modu', '500L üzeri bagaj', 
      'Elektrikli bagaj kapısı', 'Panoramik tavan camı'
    ]
  },
  {
    id: 'hilux',
    name: 'HILUX',
    fullName: 'Hilux 4x4',
    type: 'ticari',
    bodyType: 'Pickup',
    powertrain: 'DİZEL',
    seats: 5,
    tagline: 'Yenilmez ve Efsanevi Dayanıklılık',
    description: 'En zorlu arazi koşullarında durdurulamaz güç, açık kasa taşıma alanı ve 3.5 ton çekme kapasitesi.',
    cardbToken: '796893e8-e0dd-49b7-addd-c3b4cb803b41',
    vehicleId: '102759',
    colorCode: '5C7',
    imageUrl: 'https://img-optimize.toyota-europe.com/ccis/zip/tr/product-token/796893e8-e0dd-49b7-addd-c3b4cb803b41/vehicle/102759/width/680/height/383/padding/0,0,0,0/image-quality/70/day-exterior-03_5C7.png',
    url: 'https://www.toyota.com.tr/araba-modelleri/hilux',
    startingPrice: '2.180.000 TL',
    tags: [
      '4x4 tahrik sistemi', 'Açık kasa', '1 ton üstü', 'Karavan çekebilen', 
      'Güçlü süspansiyon', 'Çekiş kontrol modu', 'Yüksek sürüş açıklığı',
      'Zeminde ve tavanda'
    ]
  },
  {
    id: 'proace-city-cargo',
    name: 'Proace City Cargo',
    fullName: 'Proace City Cargo',
    type: 'ticari',
    bodyType: 'Van',
    powertrain: 'DİZEL',
    seats: 2,
    tagline: 'Kompakt ve Pratik İş Ortağı',
    description: 'Şehir içi dar sokaklarda maksimum hareket kabiliyeti, 1 tona varan taşıma ve 2 europalet kapasitesi.',
    cardbToken: 'f0ae6d02-a9bd-42d1-a6bf-8cd809c59d9a',
    vehicleId: '82140',
    colorCode: 'EPR',
    imageUrl: 'https://img-optimize.toyota-europe.com/ccis/zip/tr/product-token/f0ae6d02-a9bd-42d1-a6bf-8cd809c59d9a/vehicle/82140/width/680/height/383/padding/0,0,0,0/image-quality/70/day-exterior-03_EPR.png',
    url: 'https://www.toyota.com.tr/araba-modelleri/proace-city-cargo',
    startingPrice: '1.090.000 TL',
    tags: [
      'Her iki tarafta sürgülü kapı', 'Arka kapılar 180 derece açılabilen',
      '1', '2', '1 ton altı', 'Dar sokaklara rahat giren (küçük dönüş çaplı)',
      '180 derece geri görüş kamerası', 'Arka park sensörü', 'Mobil ofis / masaya dönüşebilen orta koltuk',
      'Tüm köprü ve otoyollardan geçebilen', 'Zeminde'
    ]
  },
  {
    id: 'proace-cargo',
    name: 'Proace Cargo',
    fullName: 'Proace Cargo',
    type: 'ticari',
    bodyType: 'Van',
    powertrain: 'DİZEL',
    seats: 3,
    tagline: 'Geniş Hacimli ve Dayanıklı Ticari',
    description: '3 europalet taşıma alanı, 1 ton üstü yük kapasitesi ve 4 metreye kadar uzun yük geçişi.',
    cardbToken: '4abf7b94-ee9f-4b55-836c-f68040d9e1f8',
    vehicleId: '100855',
    colorCode: 'EPR',
    imageUrl: 'https://img-optimize.toyota-europe.com/ccis/zip/tr/product-token/4abf7b94-ee9f-4b55-836c-f68040d9e1f8/vehicle/100855/width/680/height/383/padding/0,0,0,0/image-quality/70/day-exterior-03_EPR.png',
    url: 'https://www.toyota.com.tr/araba-modelleri/proace-cargo',
    startingPrice: '1.450.000 TL',
    tags: [
      'Her iki tarafta sürgülü kapı', 'Arka kapılar 180 derece açılabilen',
      '2', '3', '1 ton üstü', 'Sürücü kabininden bağımsız yük bölümü',
      '3 metreye kadar boru/tel/çubuk sığdırabilen', '4 metreye kadar boru/tel/çubuk sığdırabilen',
      '230V güç çıkışı (ev tipi priz)', 'Zeminde ve tavanda', 'Tüm köprü ve otoyollardan geçebilen'
    ]
  },
  {
    id: 'proace-verso',
    name: 'Proace Verso',
    fullName: 'Proace Verso',
    type: 'ticari',
    bodyType: 'Minibüs',
    powertrain: 'DİZEL',
    seats: 8,
    tagline: 'VIP Yolcu Taşımacılığı ve Geniş Aileler',
    description: '8 kişilik lüks oturma düzeni, geniş bagaj ve üstün yolcu konforu.',
    cardbToken: '40309f75-11b2-443d-bf3c-d26f99103885',
    vehicleId: '96216',
    colorCode: 'KKJ',
    imageUrl: 'https://img-optimize.toyota-europe.com/ccis/zip/tr/product-token/40309f75-11b2-443d-bf3c-d26f99103885/vehicle/96216/width/680/height/383/padding/0,0,0,0/image-quality/70/day-exterior-03_KKJ.png',
    url: 'https://www.toyota.com.tr/araba-modelleri/proace-verso',
    startingPrice: '1.980.000 TL',
    tags: [
      'Yolcu sayısı 8\'e kadar', 'Her iki tarafta sürgülü kapı', 'Geniş bacak mesafesi',
      '360 derece geri görüş kamerası', 'Tüm köprü ve otoyollardan geçebilen'
    ]
  },
  {
    id: 'proace-max',
    name: 'Proace Max',
    fullName: 'Proace Max',
    type: 'ticari',
    bodyType: 'Büyük Van / Şasi',
    powertrain: 'DİZEL',
    seats: 9,
    tagline: 'Maksimum Kapasite, Maksimum Güç',
    description: '5 europalete kadar yükleme kapasitesi, 17 m³ hacim ve üstyapı çözümleriyle her türlü ticari talebe yanıt.',
    cardbToken: '729f8f1b-b662-4690-aaaf-6f3d87d74716',
    vehicleId: '90676',
    colorCode: 'EPR',
    imageUrl: 'https://img-optimize.toyota-europe.com/ccis/zip/tr/product-token/729f8f1b-b662-4690-aaaf-6f3d87d74716/vehicle/90676/width/680/height/383/padding/0,0,0,0/image-quality/70/day-exterior-03_EPR.png',
    url: 'https://www.toyota.com.tr/araba-modelleri/proace-max',
    startingPrice: '1.750.000 TL',
    tags: [
      'Yolcu sayısı 8 üzeri', 'Arka kapılar 270 derece açılabilen', '4', '5', 
      '1 ton üstü', '4 metreden uzun boru/tel/çubuk sığabilen',
      'Zeminde ve tavanda', '230V güç çıkışı (ev tipi priz)'
    ]
  },
  {
    id: 'proace-city',
    name: 'Proace City',
    fullName: 'Proace City',
    type: 'binek-ticari',
    bodyType: 'Kombivan',
    powertrain: 'DİZEL',
    seats: 5,
    tagline: 'Hem İş Hem Aile İçin Kusursuz',
    description: 'Geniş iç mekan, çift sürgülü kapı ve fonksiyonel bagaj bölmesiyle hem iş günlerinde hem hafta sonlarında ideal.',
    cardbToken: 'e6569396-c137-4c51-8e5a-d4f70f44f110',
    vehicleId: '82131',
    colorCode: 'EPR',
    imageUrl: 'https://img-optimize.toyota-europe.com/ccis/zip/tr/product-token/e6569396-c137-4c51-8e5a-d4f70f44f110/vehicle/82131/width/680/height/383/padding/0,0,0,0/image-quality/70/day-exterior-03_EPR.png',
    url: 'https://www.toyota.com.tr/araba-modelleri/proace-city',
    startingPrice: '1.290.000 TL',
    tags: [
      'Her iki tarafta sürgülü kapı', 'Geniş bacak mesafesi', '500L üzeri bagaj', 
      'Park sensörleri', 'Yedek görüş kamerası', 'Tüm köprü ve otoyollardan geçebilen'
    ]
  }
];

// Matching logic based on user selections
export function getMatchedVehicles(category, businessType, selections, s3Answers) {
  // Commercial passenger transport override rule (From Excel)
  if (category === 'Ticari Araç' && businessType === 'Yolcu Taşımacılığı') {
    const isOver8 = (selections[111] || []).includes('Yolcu sayısı 8 üzeri');
    if (isOver8) {
      const maxModel = TOYOTA_MODELS.find(m => m.id === 'proace-max');
      return {
        best: maxModel,
        second: null,
        isSingle: true,
        bestScore: 94,
        secondScore: null,
        disclaimer: 'Bu modelde üst yapı gerekliliği ve versiyon detayı için yetkili Toyota bayinize danışın.'
      };
    } else {
      const versoModel = TOYOTA_MODELS.find(m => m.id === 'proace-verso');
      return {
        best: versoModel,
        second: null,
        isSingle: true,
        bestScore: 92,
        secondScore: null,
        disclaimer: null
      };
    }
  }

  // Flatten all selected filter options
  const selectedOptions = [];
  Object.values(selections).forEach(opts => {
    if (Array.isArray(opts)) {
      opts.forEach(opt => selectedOptions.push(opt));
    }
  });

  // Score models based on category and tags
  const candidates = TOYOTA_MODELS.filter(m => {
    if (category === 'Ticari Araç') {
      return m.type === 'ticari' || m.type === 'binek-ticari';
    }
    if (category === 'Binek Araç') {
      return m.type === 'binek' || m.type === 'binek-ticari';
    }
    return true; // Her İkisi de
  });

  const scored = candidates.map(model => {
    let matchCount = 0;
    selectedOptions.forEach(opt => {
      if (model.tags.some(tag => tag.toLowerCase() === opt.toLowerCase() || opt.toLowerCase().includes(tag.toLowerCase()) || tag.toLowerCase().includes(opt.toLowerCase()))) {
        matchCount++;
      }
    });

    // Baseline base score
    let baseScore = 80;
    if (category === 'Binek Araç') {
      if (s3Answers.includes('Macera/Doğa Aktiviteleri') && (model.id === 'rav4' || model.id === 'corolla-cross' || model.id === 'yaris-cross')) {
        baseScore += 5;
      }
      if (s3Answers.includes('Aile ve Çocuklu Yaşam') && (model.id === 'corolla-cross' || model.id === 'corolla-sedan')) {
        baseScore += 6;
      }
      if (s3Answers.includes('Şehir Hayatı') && (model.id === 'yaris' || model.id === 'yaris-cross' || model.id === 'c-hr')) {
        baseScore += 6;
      }
    }

    const calculatedPercent = Math.min(97, Math.max(78, baseScore + (matchCount * 3)));
    return {
      model,
      score: calculatedPercent,
      matchCount
    };
  });

  scored.sort((a, b) => b.score - a.score || b.matchCount - a.matchCount);

  // Default fallbacks if scoring produces tied or specific layouts
  const best = scored[0]?.model || TOYOTA_MODELS[0];
  let second = scored[1]?.model || TOYOTA_MODELS[1];
  if (second.id === best.id) {
    second = TOYOTA_MODELS.find(m => m.id !== best.id && (category === 'Ticari Araç' ? m.type === 'ticari' : m.type === 'binek')) || TOYOTA_MODELS[1];
  }

  const bestScore = scored[0]?.score || 90;
  const secondScore = Math.min(bestScore - 3, scored[1]?.score || 87);

  return {
    best,
    second,
    isSingle: false,
    bestScore,
    secondScore,
    disclaimer: null
  };
}
