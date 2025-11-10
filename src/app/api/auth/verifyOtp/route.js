import { NextResponse } from "next/server";
import { connectDB } from "@/utils/connectDB";
import User from "@/models/User";
import { hashValue, verifyValue } from "@/utils/authentication";

export async function POST(req) {
  try {
    await connectDB();

    const { otpCode } = await req.json();
    if (!otpCode) {
      return NextResponse.json({ error: "OTP is required." }, { status: 422 });
    }

    const cookie = req.cookies.get("Verification_Token");
    if (!cookie) {
      return NextResponse.json(
        { error: "OTP expired or missing." },
        { status: 410 }
      );
    }

    const { email, fullName, hashedPassword, hashedOtp } = JSON.parse(
      cookie.value
    );

    const isMatch = await verifyValue(otpCode, hashedOtp);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid OTP." }, { status: 401 });
    }

    const user = new User({
      fullName,
      email,
      password: hashedPassword,
      isVerified: true,
    });
    await user.save();

    const response = NextResponse.json({
      message: "Account created and logged in successfully!",
    });
    response.cookies.set("Verification_Token", "", { maxAge: 0 });

    return response;
  } catch (error) {
    console.log("OTP ERROR >>> ", error);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
