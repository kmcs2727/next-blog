"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async(e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/login`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });
      const jsonData = await response.json();
      localStorage.setItem("token", jsonData.token);
      alert(jsonData.message);
    } catch(err) {
      alert("ログイン失敗");
    }
  }
  return (
    <div className="p-6 items-center justify-center">
      <h1 className="font-bold text-2xl mb-6">ログイン</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-md">
        <Input className="mb-4 w-3/4" type="text" name="email" placeholder="メールアドレス" required value={email} onChange={(e) => setEmail(e.target.value)}/>
        <Input className="mb-4 w-3/4" type="password" name="password" placeholder="パスワード" required value={password} onChange={(e) => setPassword(e.target.value)}/>
        <Button variant={'outline'}>ログイン</Button>
      </form>
    </div>
  )
}
