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
			<div className="p-6 items-center justify-center">
				<h1>{singleItem.title}</h1>
				<p>{singleItem.content}</p>
				<Button asChild variant={"outline"}>
					<Link href={`/item/update/${singleItem._id}`}>編集</Link>
				</Button>
				<Button asChild variant={"outline"}>
					<Link href={`/item/delete/${singleItem._id}`}>削除</Link>
				</Button>
			</div>
		</>
	);
}