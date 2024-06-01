import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";

export async function POST(request: any){
  const requestBody = await request.json();
  console.log(requestBody);
  try {
    await connectDB();
    await ItemModel.create(requestBody);
    return NextResponse.json({message: "アイテム作成成功"});
  } catch(err) {
    return NextResponse.json({message: "アイテム作成失敗"});
  }
}