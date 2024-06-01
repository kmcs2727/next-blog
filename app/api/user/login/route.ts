import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { UserModel } from "@/app/utils/schemaModels";
import { SignJWT } from "jose";

export async function POST(request: any) {
	const requestBody = await request.json();
	try {
		await connectDB();
		const savedUserData = await UserModel.findOne({email: requestBody.email});
		if(savedUserData) {
			if(requestBody.password === savedUserData.password) {
				const secretKey = new TextEncoder().encode("next-blog");
				const payload = {
					email: requestBody.email,
				};
				const token = await new SignJWT(payload).setProtectedHeader({alg: "HS256"}).setExpirationTime("1d").sign(secretKey);
				console.log(token);
				return NextResponse.json({message: "ログイン成功", token: token});
			}
			else{
				return NextResponse.json({message: "ログイン失敗: パスワードが間違っています"});
			}
		}
		else {
			return NextResponse.json({message: "ログイン失敗: ユーザー登録をしてください"});
		}
	} catch(err) {
		return NextResponse.json({message: "ログイン失敗"});
	}
}