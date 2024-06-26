"use client";
import Link from "next/link";
import Header from "./components/header";
import useCheckLogin from "./utils/useCheckLogin";
import { useEffect, useState } from "react";

export default function ReadTodayItems() {
  const loginUserEmail = useCheckLogin();
  const [itemsToday, setItemsToday] = useState([]);

  useEffect(() => {
    const getItemsByPerson = async() => {
      var now = new Date();
      const now_year = now.getFullYear();
      const now_month = now.getMonth() + 1;
      const now_date = now.getDate();
      const today = now_year + "/" + now_month + "/" + now_date;
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readtoday`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          today: today,
        })
      });
      const jsonData = await response.json();
      setItemsToday(jsonData.itemsToday);
    }
    getItemsByPerson();
  }, [loginUserEmail]);

  return (
    <>
      <Header />
      <div className="container">
        <div className="p-6 items-center justify-center">
          {loginUserEmail === "" ? (
            <h1 className="font-bold text-5xl mb-6">Welcome NX-BLOG</h1>
          ):(
            <></>
          )}
          <h1 className="font-bold text-2xl mb-6">本日のブログ</h1>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-10">
            {itemsToday?.map((item: any) => (
              <div key={item._id} className="border p-2 rounded-lg relative">
                <Link href={`/item/readsingle/${item._id}`}>
                  <h3 className="font-bold">{item.title}</h3>
                  <p>最終更新日: {item.updateDate}</p>
                  {item.content.length > 150 ? (
                    <p>{item.content.substring(0, 150)}...</p>
                  ):(
                    <p>{item.content}</p>
                  )}
                  <span className="absolute inset-0"></span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
