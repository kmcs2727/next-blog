import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { EmailTemplate } from '@/app/components/email-template';

const resend = new Resend(process.env.RESEND_API_KEY);
const MANAGEMENT_EMAIL = process.env.MANAGEMENT_EMAIL as string;

export async function POST(request: any) {
	const requestBody = await request.json();
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: MANAGEMENT_EMAIL,
      subject: requestBody.title,
      react: EmailTemplate({ loginUserEmail: requestBody.loginUserEmail, content: requestBody.content }),
    });
    return NextResponse.json({message: "送信成功"});
  } catch (error) {
    return NextResponse.json({message: "送信失敗"});
  }
}