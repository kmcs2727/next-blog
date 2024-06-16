"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/app/components/header";
import { useRouter } from "next/navigation";

export default function Register() {

  const toast = useToast();
  const router = useRouter();

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
      if(jsonData.message === "ユーザー登録成功") {
        toast.toast({
          title: jsonData.message,
        });
        router.push("/user/login");
      }
      else {
        toast.toast({
          variant: "destructive",
          title: jsonData.message,
        })
      }
    } catch(err) {
      toast.toast({
        variant: "destructive",
        title: "ユーザー登録失敗",
      });
    }
    setName("");
    setEmail("");
    setPassword("");
  }

  return (
    <div>
      <Header />
      <div className="flex items-start justify-center min-h-screen bg-gray-100 pt-16">
        <div className="bg-white shadow-md rounded-lg p-8 w-full  max-w-md">
          <h1 className="font-bold text-3xl mb-6 text-center text-gray-800">ユーザー登録</h1>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <Input 
              className="p-3 border border-gray-300 rounded-lg"
              type="text" 
              name="name" 
              placeholder="ユーザー名" 
              required 
              value={name} 
              onChange={(e) => setName(e.target.value)}
            />
            <Input 
              className="p-3 border border-gray-300 rounded-lg"
              type="email" 
              name="email" 
              placeholder="メールアドレス" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input 
              className="p-3 border border-gray-300 rounded-lg"
              type="password" 
              name="password" 
              placeholder="パスワード" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant='outline' className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300">
              登録
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}