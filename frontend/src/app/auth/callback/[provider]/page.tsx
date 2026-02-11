'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import { toast } from 'sonner';
import { apiFetch } from '@/lib/api';

export default function SocialCallbackPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  useEffect(() => {
    const provider = params.provider as string;
    const code = searchParams.get('code');

    if (!code) {
      toast.error('認証に失敗しました');
      router.replace('/login');
      return;
    }

    (async () => {
      try {
        await apiFetch('/api/auth/browser/v1/auth/provider/token', {
          method: 'POST',
          body: JSON.stringify({
            provider,
            token: { client_id: '', code },
            process: 'login',
          }),
        });
        router.replace('/products');
      } catch {
        toast.error('ソーシャルログインに失敗しました');
        router.replace('/login');
      }
    })();
  }, [router, params, searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-muted-foreground">認証処理中...</p>
    </div>
  );
}
