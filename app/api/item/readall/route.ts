import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";

export async function GET(request: any) {
	try {
		await connectDB();
		const allItems = await ItemModel.find();
		return NextResponse.json({message: "アイテム読み取り成功(ALL)", allItems: allItems});
	} catch(err) {
		return NextResponse.json({message: "アイテム読み取り失敗(ALL)"});
	}
}

export const revalidate = 0;