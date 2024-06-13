"use client";
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button'; 
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useToast } from '@/components/ui/use-toast'; 
import useCheckLogin from '@/app/utils/useCheckLogin';

export default function Header() {
  const loginUserEmail = useCheckLogin();
  const toast = useToast();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.toast({
      title: "ログアウトしました",
    });
    router.refresh();
    router.push("/user/login");
  }

  return (
    <header className="h-16 border-b gap-3 px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Button asChild variant="link" className="font-bold text-xl">
          <Link href="/">Next Blog</Link>
        </Button>
        <Button asChild variant="ghost" className="font-bold">
          <Link href="/item/readall">記事一覧</Link>
        </Button>
        <Button asChild variant="ghost" className="font-bold">
          <Link href="/user/mypage">マイページ</Link>
        </Button>
        <Button asChild variant="ghost" className="font-bold">
          <Link href="/item/create">作成</Link>
        </Button>
        {loginUserEmail ? (
          <>
            <Button variant="ghost" className="font-bold" onClick={handleLogout}>ログアウト</Button>
          </>
        ):(
          <>
            <Button asChild variant="ghost" className="font-bold">
              <Link href="/user/login">ログイン</Link>
            </Button>
            <Button asChild variant="ghost" className="font-bold">
              <Link href="/user/register">新規登録</Link>
            </Button>
          </>
        )}
      </div>
      <div className="flex items-end gap-3 ml-auto mr-6">
        <Button asChild className="font-bold">
          <Link href="/user/contact">お問い合わせ</Link>
        </Button>
      </div>
    </header>
  );
}
