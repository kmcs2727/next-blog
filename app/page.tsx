import Link from "next/link";
import Header from "./components/header";

const getAllItems = async() => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readall`, {cache: "no-store"});
  const jsonData = await response.json();
  const allItems = jsonData.allItems;
  return allItems;
}

export default async function ReadAllItems() {
  
  const allItems = await getAllItems();

  return (
    <div>
      <Header />
      <div className="p-6 items-center justify-center">
        <h1 className="font-bold text-5xl mb-6">Welcome Next Blog</h1>
        <h1 className="font-bold text-2xl mb-6">本日のブログ</h1>
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
    </div>
  );
}
