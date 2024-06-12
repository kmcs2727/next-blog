"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useAuth from "@/app/utils/useAuth";
import Header from "@/app/components/header";

export default function CreateItem() {

  const [title,setTtile] = useState("");
  const [content, setContent] = useState("");
  const loginUserEmail = useAuth();

  const router = useRouter();

  const handleSubmit = async(e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/create`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title: title,
          content: content,
          email: loginUserEmail
        })
      });
      const jsonData = await response.json();
      alert(jsonData.message);
      router.push("/");
      router.refresh();
    } catch(err) {
      alert("アイテム作成失敗");
    }
  }
  if(loginUserEmail){
    return (
      <div>
        <Header />
        <div className="p-6 items-center justify-center">
          <h1 className="font-bold text-2xl mb-6">記事作成</h1>
          <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-md">
            <Input className="mb-4 w-3/4" type="text" name="title" placeholder="タイトル" required value={title} onChange={(e) => setTtile(e.target.value)}/>
            <Textarea className="mb-4 w-3/4" name="content" placeholder="内容" value={content} onChange={(e) => setContent(e.target.value)}></Textarea>
            <Button variant={'outline'}>作成</Button>
          </form>
        </div>
      </div>
    );
  }
}
