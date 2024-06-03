"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useAuth from "@/app/utils/useAuth";

export default function DeleteItem(context: any) {

  const [title,setTtile] = useState("");
  const [content, setContent] = useState("");
	const [email, setEmail] = useState("");

  const router = useRouter();

  const loginUserEmail = useAuth();

	useEffect(() => {
		const getSingleItem = async(id: any) => {
			const response = await fetch(`http://localhost:3000/api/item/readsingle/${id}`, {cache: "no-store"});
			const jsonData = await response.json();
			const singleItem = jsonData.singleItem;
			setTtile(singleItem.title);
			setContent(singleItem.content);
			setEmail(singleItem.email);
		}
		getSingleItem(context.params.id);
	}, [context]);

  const handleSubmit = async(e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/delete/${context.params.id}`, {
        method: "DELETE",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          email: loginUserEmail,
        })
      });
      const jsonData = await response.json();
      alert(jsonData.message);
      router.push("/");
      router.refresh();
    } catch(err) {
      alert("アイテム削除失敗");
    }
  }

  if(loginUserEmail === email) {
    return (
      <div className="p-6 items-center justify-center">
        <h1 className="font-bold text-2xl mb-6">記事削除</h1>
        <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-md">
          <Input className="mb-4 w-3/4" type="text" name="title" placeholder="タイトル" value={title} readOnly/>
          <Textarea className="mb-4 w-3/4" name="content" placeholder="内容" value={content} readOnly></Textarea>
          <Button variant={'outline'}>削除</Button>
        </form>
      </div>
    );
  }
  else {
    return (
      <h1>権限がありません</h1>
    );
  }
  
}
