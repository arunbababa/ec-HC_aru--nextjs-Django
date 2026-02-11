'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod/v4';
import { toast } from 'sonner';

import { signup, getProviderRedirectUrl } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const schema = z
  .object({
    email: z.email('有効なメールアドレスを入力してください'),
    password1: z.string().min(8, 'パスワードは8文字以上で入力してください'),
    password2: z.string().min(1, '確認用パスワードを入力してください'),
  })
  .refine((data) => data.password1 === data.password2, {
    message: 'パスワードが一致しません',
    path: ['password2'],
  });

type FormValues = z.infer<typeof schema>;

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      await signup(data.email, data.password1, data.password2);
      toast.success('アカウントを作成しました');
      router.push('/products');
    } catch (err: unknown) {
      const error = err as { body?: { form?: { errors?: { message: string }[] } } };
      const messages = error.body?.form?.errors;
      if (messages?.length) {
        toast.error(messages.map((e) => e.message).join('\n'));
      } else {
        toast.error('登録に失敗しました');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>新規登録</CardTitle>
          <CardDescription>EC Shop のアカウントを作成</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input id="email" type="email" placeholder="you@example.com" {...register('email')} />
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password1">パスワード</Label>
              <Input id="password1" type="password" {...register('password1')} />
              {errors.password1 && <p className="text-sm text-destructive">{errors.password1.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password2">パスワード（確認）</Label>
              <Input id="password2" type="password" {...register('password2')} />
              {errors.password2 && <p className="text-sm text-destructive">{errors.password2.message}</p>}
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? '登録中...' : 'アカウント作成'}
            </Button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">または</span>
              </div>
            </div>

            <div className="grid gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => window.location.href = getProviderRedirectUrl('github')}
              >
                GitHub で登録
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => window.location.href = getProviderRedirectUrl('google')}
              >
                Google で登録
              </Button>
            </div>
          </CardContent>
        </form>
        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            すでにアカウントをお持ちの方は{' '}
            <Link href="/login" className="text-primary underline underline-offset-4">
              ログイン
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
