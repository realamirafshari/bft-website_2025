import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/utils/connectDB";
import User from "@/models/User";
import { hashPassword } from "@/utils/authentication";

export async function POST(req) {
  try {
    await connectDB();

    const { otp } = await req.json();
    if (!otp) {
      return NextResponse.json({ error: "OTP is required." }, { status: 422 });
    }

    const cookie = req.cookies.get("otp_data");
    if (!cookie) {
      return NextResponse.json(
        { error: "OTP expired or missing." },
        { status: 410 }
      );
    }

    const { email, fullName, password, hashedOtp } = JSON.parse(cookie.value);

    // ✅ مقایسه OTP
    const isMatch = await bcrypt.compare(otp, hashedOtp);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid OTP." }, { status: 401 });
    }

    // ✅ ایجاد یوزر
    const user = new User({
      fullName,
      email,
      password: await hashPassword(password),
    });
    await user.save();

    // ✅ حذف کوکی OTP
    const response = NextResponse.json({
      message: "Account created and logged in successfully!",
    });
    response.cookies.set("otp_data", "", { maxAge: 0 });

    return response;
  } catch (error) {
    console.log("OTP ERROR >>> ", error);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
