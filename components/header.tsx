"use client";
import React from 'react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useToast } from './ui/use-toast';
import checkLogin from '@/app/utils/checkLogin';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; 

export default function Header() {
  const loginUserEmail = checkLogin();
  const toast = useToast();
  const router = useRouter();

  const handleLogin = () => {
    if(loginUserEmail !== "") {
      toast.toast({
        title: "既にログインしています",
      });
    }
    else {
      router.push("/user/login");
    }
  }

  const handleLogout = () => {
    if(loginUserEmail !== "") {
      localStorage.removeItem("token");
      toast.toast({
        title: "ログアウトしました",
      });
      router.push("/");
    }
    else {
      toast.toast({
        title: "ログインしていないためログアウトできません",
      });
    }
  }

  const handleRegister = () => {
    if(loginUserEmail !== "") {
      localStorage.removeItem("token");
      toast.toast({
        title: "ログアウトしました",
      });
    }
    router.push("/user/register");
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="font-bold">認証</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={handleLogin}>ログイン</DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>ログアウト</DropdownMenuItem>
            <DropdownMenuItem onClick={handleRegister}>新規登録</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex items-end gap-3 ml-auto mr-6">
        <Button asChild className="font-bold">
          <Link href="/user/contact">お問い合わせ</Link>
        </Button>
      </div>
    </header>
  );
}
