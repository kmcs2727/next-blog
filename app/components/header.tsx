"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button'; 
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useToast } from '@/components/ui/use-toast'; 
import useCheckLogin from '@/app/utils/useCheckLogin';
import menuImage from "@/public/bars_24.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


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
      <>
        <div className="flex items-center gap-3 hidden md:block">
          <Button asChild variant="link" className="font-bold text-xl">
            <Link href="/">NX-BLOG</Link>
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
        <div className="flex items-end gap-3 ml-auto mr-6 hidden md:block">
          <Button asChild className="font-bold">
            <Link href="/user/contact">お問い合わせ</Link>
          </Button>
        </div>
      </>
      <>
        <div className="flex items-center gap-3 block md:hidden">
          <Button asChild variant="link" className="font-bold text-xl">
            <Link href="/">NX-BLOG</Link>
          </Button>
        </div>
        <div className="flex items-end gap-3 ml-auto mr-6 block md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Image src={menuImage} alt="menu" width={50} height={50}></Image>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Button asChild variant="ghost" className="font-bold">
                <Link href="/item/readall">記事一覧</Link>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button asChild variant="ghost" className="font-bold">
                <Link href="/user/mypage">マイページ</Link>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button asChild variant="ghost" className="font-bold">
                <Link href="/item/create">作成</Link>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {loginUserEmail ? (
            <>
              <DropdownMenuItem>
                <Button variant="ghost" className="font-bold" onClick={handleLogout}>ログアウト</Button>
              </DropdownMenuItem>
            </>
            ):(
            <>
              <DropdownMenuItem>
                <Button asChild variant="ghost" className="font-bold">
                  <Link href="/user/login">ログイン</Link>
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button asChild variant="ghost" className="font-bold">
                  <Link href="/user/register">新規登録</Link>
                </Button>
              </DropdownMenuItem>
            </>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Button asChild className="font-bold">
                <Link href="/user/contact">お問い合わせ</Link>
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
      </>
    </header>
  );
}
