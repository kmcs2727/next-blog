import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { EmailTemplate } from '@/app/components/email-template';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: any) {
	const requestBody = await request.json();
  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "nextblogmanagement@gmail.com",
      subject: requestBody.title,
      react: EmailTemplate({ loginUserEmail: requestBody.loginUserEmail, content: requestBody.content }),
    });
    return NextResponse.json({message: "送信成功"});
  } catch (error) {
    return NextResponse.json({message: "送信失敗"});
  }
}