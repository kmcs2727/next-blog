import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { UserModel } from "@/app/utils/schemaModels";
import { ItemModel } from "@/app/utils/schemaModels";

export async function POST(request: any) {
	const requestBody = await request.json();
	try {
		await connectDB();
		const existName = await UserModel.findOne({name: requestBody.name});
		const existEmail = await UserModel.findOne({email: requestBody.email});
		if(existName > 0 && existName.email !== requestBody.loginUserEmail) {
			return NextResponse.json({message: "このユーザー名は既に使用されています"});
		}
		else if(existEmail > 0 && existEmail.email !== requestBody.loginUserEmail) {
			return NextResponse.json({message: "このメールアドレスは既に使用されています"});
		}
		else {
			await UserModel.deleteOne({email: requestBody.loginUserEmail});
			await UserModel.insertMany({name: requestBody.name, email: requestBody.email, password: requestBody.password});
			if(requestBody.email !== requestBody.loginUserEmail) {
				await ItemModel.updateMany({email: requestBody.loginUserEmail},{email: requestBody.email});
			}
			return NextResponse.json({message: "ユーザー情報更新成功"});
		}
	} catch(err) {
		return NextResponse.json({message: "ユーザー情報更新失敗"});
	}
}