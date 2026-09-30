'use client';

import dynamic from 'next/dynamic';

// Dynamically import App with SSR disabled to guarantee flawless client-side DOM & window measurements
const App = dynamic(() => import('../src/App'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-3 border-[#EB0A1E] border-t-transparent rounded-full animate-spin" />
        <p className="text-white text-sm font-medium tracking-wide">Toyota Akıllı Model Seçici Yükleniyor...</p>
      </div>
    </div>
  ),
});

export default function HomePage() {
  return <App />;
}
