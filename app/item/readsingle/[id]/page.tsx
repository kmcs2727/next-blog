import Header from "@/app/components/header";
import { Button } from "@/components/ui/button";
import Link from "next/link";


const getSingleItem = async(id: any) => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readsingle/${id}`, {cache: "no-store"});
	const jsonData = await response.json();
	const singleItem = jsonData.singleItem;
	return singleItem;
}

export default async function ReadSingleItem(context: any) {
	const singleItem = await getSingleItem(context.params.id);
	return (
		<>
			<Header />
			<div className="container mx-auto p-6">
        <div className="bg-white shadow-md rounded p-6 items-center justify-center">
          <h1 className="text-3xl font-bold mb-4">{singleItem.title}</h1>
					<p className="text-lg mb-6">最終更新日: {singleItem.updateDate}</p>
          <p className="text-lg mb-6">{singleItem.content}</p>
          <div className="flex space-x-4">
            <Button asChild variant={"outline"}>
              <Link href={`/item/update/${singleItem._id}`}>編集</Link>
            </Button>
            <Button asChild variant={"outline"}>
              <Link href={`/item/delete/${singleItem._id}`}>削除</Link>
            </Button>
          </div>
        </div>
      </div>
		</>
	);
}