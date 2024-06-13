"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useAuth from "@/app/utils/useAuth";
import Header from "@/app/components/header";
import { useToast } from "@/components/ui/use-toast";

export default function CreateItem() {

  const [title,setTtile] = useState("");
  const [content, setContent] = useState("");
  const loginUserEmail = useAuth();
  const toast = useToast();

  const router = useRouter();

  const handleSubmit = async(e: any) => {
    e.preventDefault();
    try {
      var now = new Date();
      const now_year = now.getFullYear();
      const now_month = now.getMonth() + 1;
      const now_date = now.getDate();
      const now_hour = now.getHours();
      const now_minute = now.getMinutes();
      const date = now_year + "/" + now_month + "/" + now_date + "/" + now_hour + ":" + now_minute;
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
          email: loginUserEmail,
          createDate: date,
          updateDate: date,
        })
      });
      const jsonData = await response.json();
      if(jsonData.message === "アイテム作成成功") {
        toast.toast({
          title: "アイテムを作成しました",
        });
      }
      else {
        toast.toast({
          title: "アイテム作成に失敗しました",
          variant: "destructive",
        });
      }
      router.push("/");
      router.refresh();
    } catch(err) {
      toast.toast({
        title: "アイテム作成に失敗しました",
        variant: "destructive",
      });
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
