import { NextRequest, NextResponse } from 'next/server';
import fetch from 'node-fetch';

export async function POST(req: NextRequest) {
  const { email, name, lastName, message } = await req.json();

  const emailData = {
    service_id: process.env.EMAILJS_SERVICE_ID,
    template_id: process.env.EMAILJS_TEMPLATE_ID,
    user_id: process.env.EMAILJS_USER_ID, // EmailJS Public Key
    template_params: {
      user_email: email,
      from_name: `${name} ${lastName}`,
      message: message,
    },
  };

  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    if (response.ok) {
      return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });
    } else {
      const error: any = await response.json();
      return NextResponse.json({ message: error.message || 'Failed to send email' }, { status: 500 });
    }
  } catch (error: any) {
    return NextResponse.json({ message: 'Failed to send email.', error: error.message }, { status: 500 });
  }
}