'use client';

import { toast } from 'sonner';

export default function Home() {
  const handleTestToast = () => {
    toast.success('セットアップ完了！Toast通知が動作しています 🎉');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <main className="flex flex-col items-center gap-8 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-white">EC Shop</h1>
        <p className="text-xl text-slate-300">Django REST Framework × Next.js</p>
        <div className="mt-4 flex flex-col gap-4 text-sm text-slate-400">
          <p>✅ Next.js (App Router) セットアップ完了</p>
          <p>✅ shadcn/ui 導入完了</p>
          <p>✅ React Hook Form + Zod 導入完了</p>
          <p>✅ ESLint + Prettier 設定完了</p>
        </div>
        <button
          onClick={handleTestToast}
          className="mt-8 rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-purple-700"
        >
          Toast通知をテスト
        </button>
      </main>
    </div>
  );
}
