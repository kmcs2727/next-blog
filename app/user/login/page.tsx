"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/app/components/header";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const toast = useToast();

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
      if(jsonData.message.substring(0, 6) === "ログイン成功") {
        toast.toast({
          title: jsonData.message,
        });
        router.refresh();
        router.push("/");
      }
      else {
        toast.toast({
          variant: "destructive",
          title: jsonData.message,
        });
        router.refresh();
      }
    } catch(err) {
      toast.toast({
        variant: "destructive",
        title: "ログイン失敗",
      });
      router.refresh();
    }
  }
  return (
    <div>
      <Header />
      <div className="flex items-start justify-center min-h-screen bg-gray-100 pt-16">
        <div className="bg-white shadow-md rounded-lg p-8 w-full  max-w-md">
          <h1 className="font-bold text-3xl mb-6 text-center text-gray-800">ログイン</h1>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <Input 
              className="p-3 border border-gray-300 rounded-lg" 
              type="text" name="email" 
              placeholder="メールアドレス" 
              required value={email} 
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input 
              className="p-3 border border-gray-300 rounded-lg" 
              type="password" name="password" 
              placeholder="パスワード" 
              required value={password} 
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="outline" className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300">ログイン</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
