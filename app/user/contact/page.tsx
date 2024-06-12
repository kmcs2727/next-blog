import Header from '@/app/components/header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

export default function page() {
  return (
    <div>
      <Header />
      <div className="p-6 items-center justify-center">
        <h1 className="font-bold text-2xl mb-6">お問い合わせ内容</h1>
        <form className="flex flex-col items-center w-full max-w-md">
          <Input className="mb-4 w-3/4" type="text" name="title" placeholder="タイトル" required/>
          <Textarea className="mb-4 w-3/4" name="content" placeholder="内容"></Textarea>
          <Button variant={'outline'}>送信</Button>
        </form>
      </div>
    </div>
  )
}
