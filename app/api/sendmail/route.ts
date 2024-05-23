import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';


export async function POST(req: NextRequest, res: NextResponse) {

  const { email, name, lastName, message } = await req.json();
  // https://github.com/nodemailer/nodemailer/blob/master/lib/well-known/services.json
  const transporter = nodemailer.createTransport({
    service: 'Hotmail', // Use your preferred service
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const mailOptions: Mail.Options = {
    from: process.env.EMAIL_USERNAME,
    to: process.env.EMAIL_USERNAME,
    // cc: email, (uncomment this line if you want to send a copy to the sender)
    subject: `ABCreativeLabs message from ${name + ' ' + lastName} (${email})`,
    text: message,
  };

  const sendMailPromise = () =>
    new Promise<string>((resolve, reject) => {
      transporter.sendMail(mailOptions, function (err) {
        if (!err) {
          resolve('Email sent');
        } else {
          reject(err.message);
        }
      });
    });

  try {

    await sendMailPromise();
    return NextResponse.json({ message: "Email sent successfully!" }, {status: 200});
  } catch (error) {
    return NextResponse.json({ message: error }, {status: 500});
  }
};