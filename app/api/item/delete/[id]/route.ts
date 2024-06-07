import { NextResponse } from "next/server";
import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";

export async function DELETE(request: any, context: any){
	const requestBody = await request.json();
	try {
		await connectDB();
		const singleItem = await ItemModel.findById(context.params.id);
		if(singleItem.email === requestBody.email) {
			await ItemModel.deleteOne({_id: context.params.id});
			return NextResponse.json({message: "アイテム削除成功"});
		} else {
    	return NextResponse.json({message: "他の人が作成したアイテムです"});
    }
	} catch(err) {
		return NextResponse.json({message: "アイテム削除失敗"});
	}
}