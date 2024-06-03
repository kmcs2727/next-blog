"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async(e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/register`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password
        }),
      });
      const jsonData = await response.json();
      alert(jsonData.message);
    } catch(err) {
      alert("ユーザー登録失敗");
    }
  }

  return (
    <div className="p-6 items-center justify-center">
      <h1 className="font-bold text-2xl mb-6">ユーザー登録</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-md">
        <Input className="mb-4 w-3/4" type="text" name="name" placeholder="名前" required value={name} onChange={(e) => setName(e.target.value)}/>
        <Input className="mb-4 w-3/4" type="text" name="email" placeholder="メールアドレス" required value={email} onChange={(e) => setEmail(e.target.value)}/>
        <Input className="mb-4 w-3/4" type="password" name="password" placeholder="パスワード" required value={password} onChange={(e) => setPassword(e.target.value)}/>
        <Button variant={'outline'}>登録</Button>
      </form>
    </div>
  );
}
