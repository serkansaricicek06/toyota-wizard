'use client';

import dynamic from 'next/dynamic';

const AdminPanel = dynamic(
  () => import('../../../src/components/AdminPanel').then(mod => mod.AdminPanel),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-[#15151B] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-3 border-[#EB0A1E] border-t-transparent rounded-full animate-spin" />
          <p className="text-white text-sm font-medium tracking-wide">Yönetim Paneli Yükleniyor...</p>
        </div>
      </div>
    ),
  }
);

export default function AdminCatchAllPage() {
  return (
    <div className="min-h-screen bg-[#15151B]">
      <AdminPanel onExit={() => {
        if (typeof window !== 'undefined') {
          window.location.href = '/';
        }
      }} />
    </div>
  );
}
