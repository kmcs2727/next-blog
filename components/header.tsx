"use client";
import React from 'react';
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Header() {
  const [token, setToken] = useState<string | null>("kdkkfd");

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    if(storedToken) {
      setToken(storedToken);
    }
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  }

  return (
    <header className="h-16 border-b gap-3 px-6 flex items-center">
      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" className="font-bold text-xl">
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
      </div>
      <div className="flex items-center gap-3">
        {token ? (
          <Button variant="ghost" className="font-bold" onClick={handleLogout}>ログアウト</Button>
        ): (
          <Button asChild variant="ghost" className="font-bold">
            <Link href="/user/login">ログイン</Link>
          </Button>
        )}
        <Button asChild className="font-bold">
          <Link href="/user/login">お問い合わせ</Link>
        </Button>
      </div>
    </header>
  );
}
