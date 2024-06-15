"use client";
import Header from '@/app/components/header'
import useAuth from '@/app/utils/useAuth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast';
import React, { useState } from 'react'

export default function page() {
  const loginUserEmail = useAuth();
  const toast = useToast();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async(e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/send`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          loginUserEmail: loginUserEmail,
          title: title,
          content: content,
        })
      });
      const jsonData = await response.json();
      if(jsonData.message === "送信成功") {
        toast.toast({
          title: "送信しました",
        });
        setTitle("");
        setContent("");
      }
      else {
        toast.toast({
          title: "送信に失敗しました",
          variant: "destructive",
        });
      }
    } catch(err) {
      toast.toast({
        title: "送信に失敗しました",
        variant: "destructive",
      });
    }
  }

  return (
    <>
      <Header />
      <div className="container">
        <div className="p-6 items-center justify-center">
          <h1 className="font-bold text-2xl mb-6">お問い合わせ内容</h1>
          <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-md">
            <Input 
              className="mb-4 w-3/4" 
              type="text" name="title" 
              placeholder="タイトル" 
              required 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
            />
            <Textarea 
              className="mb-4 w-3/4" 
              name="content" 
              placeholder="内容" 
              required 
              value={content} 
              onChange={(e) => setContent(e.target.value)}>
            </Textarea>
            <Button type="submit" variant={'outline'}>送信</Button>
          </form>
        </div>
      </div>
    </>
  )
}
