import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";

export async function POST(request: any) {
	const requestBody = await request.json();
	try {
		await connectDB();
		const itemsByPerson = await ItemModel.find({email: requestBody.email});
		console.log(itemsByPerson);
		return NextResponse.json({message: "アイテム読み取り成功(ByPERSON)", itemsByPerson: itemsByPerson});
	} catch(err) {
		return NextResponse.json({message: "アイテム読み取り失敗(ByPERSON)"});
	}
}

export const revalidate = 0;