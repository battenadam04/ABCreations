import nodemailer from 'nodemailer';

export const sendMail = async (req: any, res: any) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Use your preferred service
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: email, // sender address
      to: "your-email@example.com", // list of receivers
      subject: "New Contact Form Submission", // Subject line
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`, // plain text body
      html: `<b>Name:</b> ${name}<br><b>Email:</b> ${email}<br><b>Message:</b> ${message}`, // html body
    });

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send the email." });
  }
};
