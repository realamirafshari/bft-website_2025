import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { connectDB } from "@/utils/connectDB";
import User from "@/models/User";
import { hashValue } from "@/utils/authentication";

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req) {
  try {
    await connectDB();
    const { fullName, email, password } = await req.json();

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { error: "Email already registered." },
        { status: 422 }
      );
    }
    const otpCode = generateOTP(); // raw code
    const hashedOtp = await hashValue(otpCode);
    const hashedPassword = await hashValue(password);

    // send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"BFT Team" <no-reply@bft.com>`,
      to: email,
      subject: "BFT Verification Code",
      html: `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f5f7fa; padding: 12px;">
      <div style="max-width: 500px; margin: auto; background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.08);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #1c97a6 0%, #13838f 100%); color: #fff; text-align: center; padding: 30px 20px; position: relative;">
          <h1 style="margin:0; font-size:26px;"> Verification Account</h1>
        </div>
        
        <!-- Body -->
        <div style="padding: 30px; color: #2d3748;">

          <div style="background: #f0f4ff; padding: 15px; border-radius: 10px; text-align: center; font-size: 16px; color: #1c97a6; border-left: 4px solid #1c97a6; margin: 20px 0;">
          Hello,  ${email}
          </div>

          <div style="text-align:center; margin: 30px 0;">
            <div style="display:inline-block; font-size: 36px; font-weight:700; letter-spacing:6px; color:#1c97a6; background:#f7f9fc; padding:20px 30px; border-radius:12px; border:2px dashed #1c97a6;">
              ${otpCode}
            </div>
          </div>

          <div style="margin-top: 25px; background:#f8f9fa; padding:20px; border-radius:10px; font-size:14px; border-left:3px solid #fac32a;">
            <strong>Important:</strong>
            <ul style="padding-left: 20px; margin-top:10px;">
              <li>This code is valid for 2 minutes only.</li>
              <li>Never share this code with anyone.</li>
              <li>If you did not request this, please ignore this email.</li>
            </ul>
          </div>
        </div>

        <!-- Footer -->
        <div style="background:#f8f9fa; padding:20px; text-align:center; font-size:12px; color:#718096; border-top:1px solid #e2e8f0;">
          <p>This email was sent automatically by BFT. Please do not reply.</p>
        </div>

      </div>
    </div>
  `,
    });

    const response = NextResponse.json({
      message: "OTP sent successfully.",
    });

    response.cookies.set(
      "Verification_Token",
      JSON.stringify({
        email,
        fullName,
        hashedPassword,
        hashedOtp,
      }),
      {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 2 * 60, // 10 minutes
        path: "/",
      }
    );

    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
