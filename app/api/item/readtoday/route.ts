import { NextResponse } from "next/server";
import { ItemModel } from "@/app/utils/schemaModels";
import connectDB from "@/app/utils/database";

export async function POST(request: any) {
	const requestBody = await request.json();
	try {
		await connectDB();
		const itemsToday = await ItemModel.find({createDate: {$regex: requestBody.today}});
		return NextResponse.json({message: "アイテム読み取り成功(today)", itemsToday: itemsToday});
	} catch(err) {
		return NextResponse.json({message: "アイテム読み取り失敗(today)"});
	}
}

export const revalidate = 0;