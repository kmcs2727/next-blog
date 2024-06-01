import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { UserModel } from "@/app/utils/schemaModels";

export async function POST(request: any) {
	const requestBody = await request.json();
	try {
		await connectDB();
		await UserModel.create(requestBody);
		return NextResponse.json({message: "ユーザー登録成功"});
	} catch(err) {
		return NextResponse.json({message: "ユーザー登録失敗"});
	}
}