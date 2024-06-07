import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const getAllItems = async() => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readall`, {cache: "no-store"});
  const jsonData = await response.json();
  const allItems = jsonData.allItems;
  return allItems;
}

export default async function ReadAllItems() {

  const allItems = await getAllItems();

  return (
    <div className="p-6 items-center justify-center">
			<h1 className="font-bold text-2xl mb-6">ブログ検索</h1>
			<Input type="text" placeholder="キーワードを入力してください"/>
			<Button asChild variant="outline" className="font-bold">
        <Link href="/item/readall">検索</Link>
      </Button>
      <h1 className="font-bold text-2xl mb-6">記事一覧</h1>
      <div className="grid grid-cols-2 gap-20">
        {allItems?.map((item: any) => (
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