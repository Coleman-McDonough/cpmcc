import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, message, captchaToken } = await request.json();

    // Step 1: Verify hCaptcha
    const captchaResponse = await fetch(`https://api.hcaptcha.com/siteverify`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: process.env.HCAPTCHA_SECRET_KEY!,
        response: captchaToken,
      }).toString(),
    });

    const captchaData = await captchaResponse.json();
    console.log("🔍 hCaptcha Verification Response:", captchaData);

    if (!captchaData.success) {
      return NextResponse.json(
        { error: "CAPTCHA verification failed", details: captchaData },
        { status: 400 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: "live.smtp.mailtrap.io",
      port: 587,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    const mailOptions = {
      from: `C.P. McDonough Construction Corp Email <emailer@cpmcdonoughconstructioncorp.com>`,
      to: process.env.EMAIL_TO,
      subject: `C.P. McDonough Construction Corp message from ${name}`,
      text: message,
      html: `<p>You have a new message from the C.P. McDonough Construction Corp website</p><p><strong>Name: </strong> ${name}</p><p><strong>Email: </strong> ${email}</p><p><strong>Message: </strong> ${message}</p>`,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent: ", info.response);
      return NextResponse.json({ success: true });
    } catch (error) {
      console.error("Error sending email: ", error);
      return NextResponse.json(
        { error: "Error sending email", details: error.message },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Error parsing request body: ", error);
    return NextResponse.json(
      { error: "Error parsing request body", details: error.message },
      { status: 500 },
    );
  }
}
