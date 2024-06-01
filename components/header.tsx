import React from 'react'
import { Button } from './ui/button';
import Link from 'next/link';

export default async function Header() {
  return (
    <header className="h-16 border-b gap-3 px-6 flex items-center">
      <Button asChild variant="ghost" className="font-bold text-xl">
        <Link href="/">Next Blog</Link>
      </Button>
      {/* <Button asChild variant="ghost" className='font-bold'>
        <Link href="/items">商品一覧</Link>
      </Button>
      <Button asChild variant="ghost">
        <Link href="/mypage">マイページ</Link>
      </Button> */}
    </header>
  );
}
