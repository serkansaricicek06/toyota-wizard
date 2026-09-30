import './globals.css';

export const metadata = {
  title: 'Toyota Araç Seçici | Size En Uygun Toyota Modelini Keşfedin',
  description: 'İhtiyaçlarınıza, yaşam tarzınıza ve bütçenize en uygun Toyota binek veya ticari aracını akıllı filtreleme ile saniyeler içinde bulun.',
  keywords: 'toyota, hibrit, suv, corolla, yaris, c-hr, rav4, hilux, proace, binek araç, ticari araç',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
  openGraph: {
    title: 'Toyota Araç Seçici | Size En Uygun Toyota Modelini Keşfedin',
    description: 'İhtiyaçlarınıza en uygun Toyota modelini akıllı filtreleme ile keşfedin.',
    type: 'website',
    locale: 'tr_TR',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-screen bg-[#0a0a0f] text-[#282830] antialiased">
        {children}
      </body>
    </html>
  );
}
