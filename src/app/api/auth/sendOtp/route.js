import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import { connectDB } from "@/utils/connectDB";
import User from "@/models/User";

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req) {
  try {
    await connectDB();
    const { fullName, email, password } = await req.json();

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: "Email already registered." }, { status: 422 });
    }

    const otp = generateOTP(); // raw code
    const hashedOtp = await bcrypt.hash(otp, 10);

    // send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `Cando Panel <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Account Activation Code",
      html: `
        <div style="padding:20px;">
          <h3>Hello ${fullName}</h3>
          <p>Your verification code:</p>
          <h1>${otp}</h1>
        </div>
      `,
    });

    // ✅ ذخیره کوکی امن شامل hashedOtp + userInfo
    const response = NextResponse.json({
      message: "OTP sent successfully.",
    });

    response.cookies.set("otp_data", JSON.stringify({
      email,
      fullName,
      password,
      hashedOtp,
    }), {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 10 * 60, // 10 minutes
      path: "/"
    });

    return response;

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Server error." },
      { status: 500 }
    );
  }
}
