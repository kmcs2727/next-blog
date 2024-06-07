import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { UserModel } from "@/app/utils/schemaModels";

export async function POST(request: any) {
	const requestBody = await request.json();
	try {
		await connectDB();
		const userInfo = await UserModel.find({email: requestBody.email});
		return NextResponse.json({message: "ユーザー情報取得成功", userInfo: userInfo});
	} catch(err) {
		return NextResponse.json({message: "ユーザー情報取得失敗"});
	}
}

export const revalidate = 0;