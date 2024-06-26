import { NextResponse } from "next/server";
import { ItemModel } from "@/app/utils/schemaModels";
import connectDB from "@/app/utils/database";

export async function POST(request: any) {
	const requestBody = await request.json();
	try {
		await connectDB();
		const itemsByPerson = await ItemModel.find({email: requestBody.email});
		return NextResponse.json({message: "アイテム読み取り成功(ByPERSON)", itemsByPerson: itemsByPerson});
	} catch(err) {
		return NextResponse.json({message: "アイテム読み取り失敗(ByPERSON)"});
	}
}

export const revalidate = 0;