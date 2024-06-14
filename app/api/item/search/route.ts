import { NextResponse } from "next/server";
import { ItemModel } from "@/app/utils/schemaModels";
import connectDB from "@/app/utils/database";

export async function POST(request: any) {
	const requestBody = await request.json();
	try {
		await connectDB();
		const itemsSearch = await ItemModel.find({
            $or: [
                {title: {$regex: requestBody.query, $options: 'i'}},
                {content: {$regex: requestBody.query, $options: 'i'}},
            ]
        });
		return NextResponse.json({message: "アイテム読み取り成功(search)", itemsSearch: itemsSearch, query: requestBody.query});
	} catch(err) {
		return NextResponse.json({message: "アイテム読み取り失敗(search)"});
	}
}

export const revalidate = 0;