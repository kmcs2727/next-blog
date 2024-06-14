"use client";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Header from "@/app/components/header";
import { useEffect, useState } from "react";

const getAllItems = async() => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readall`, {cache: "no-store"});
  const jsonData = await response.json();
  const allItems = jsonData.allItems;
  return allItems;
}

export default function ReadAllItems() {
  const [allItems, setAllItems] = useState([]);
  const [query, setQuery] = useState("");
  const [itemsSearch, setItemsSearch] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      const items = await getAllItems();
      setAllItems(items);
    }
    console.log("アイテム取得(ALL): 記事一覧ページ");
    getItems();
  }, []);

  const handleSubmit = async(e: any) => {
    e.preventDefault();
    const getItemsSearch = async() => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/search`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: query,
        })
      });
      const jsonData = await response.json();
      setItemsSearch(jsonData.itemsSearch);
      console.log("検索されました", jsonData.itemsSearch);
    }
    getItemsSearch();
  }

  return (
    <>
      <Header />
      <div className="container">
        <div className="p-6 items-center justify-center">
          <div>
            <h1 className="font-bold text-2xl mb-6">ブログ検索</h1>
            <form onSubmit={handleSubmit} className="flex mb-6 w-full max-w-md space-x-2">
              <Input 
                type="text" 
                placeholder="キーワードを入力してください" 
                className="flex-grow mr-2" 
                value={query} 
                onChange={(e) => setQuery(e.target.value)}
              />
              <Button type="submit" variant="outline" className="font-bold">検索</Button>
            </form>
            {itemsSearch.length === 0 ?(
              <>なし</>
            ):(
              <>あり</>
            )}
          </div>
          <div>
            <h1 className="font-bold text-2xl mb-6">記事一覧</h1>
            <div className="grid grid-cols-2 gap-20">
              {allItems?.map((item: any) => (
                <div key={item._id} className="border p-2 rounded-lg relative">
                  <Link href={`/item/readsingle/${item._id}`}>
                    <h3 className="font-bold">{item.title}</h3>
                    <p>最終更新日: {item.updateDate}</p>
                    <p>{item.content.substring(0, 20)}</p>
                    <span className="absolute inset-0"></span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
