"use client";
import { useEffect, useState } from "react";
import useAuth from "@/app/utils/useAuth";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function MyPage() {
  const loginUserEmail = useAuth();
  const [itemsByPerson, setItemsByPerson] = useState([]);

  useEffect(() => {
    const getItemsByPerson = async() => {
      if(loginUserEmail) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readbyperson`, {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: loginUserEmail
          })
        });
        const jsonData = await response.json();
        setItemsByPerson(jsonData.itemsByPerson);
        console.log(jsonData.itemsByPerson);
      }
    }
    getItemsByPerson();
  }, [loginUserEmail]);

  return (
    <div className="p-6 items-center justify-center">
      <h1 className="font-bold text-2xl mb-6">プロフィール設定</h1>
      <Button variant={'outline'}>更新</Button>
      <h1 className="font-bold text-2xl mb-6">あなたの記事</h1>
      <h2>{itemsByPerson.length}件</h2>
      <div className="grid grid-cols-2 gap-20">
        {itemsByPerson?.map((item: any) => (
          <div key={item._id} className="border p-2 rounded-lg relative">
            <Link href={`/item/readsingle/${item._id}`}>
              <h3 className="font-bold">{item.title}</h3>
              <p>{item.content.substring(0, 20)}</p>
              <span className="absolute inset-0"></span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
