import User from "@/models/User";
import { hashValue } from "@/utils/authentication";
import { connectDB } from "@/utils/connectDB";
import { generateRandomPassword } from "@/utils/generateRandomPassword";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const { userID, fullName, email, password, role, isVerified } = data;
  console.log(data);
  if (!userID) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const exists = await User.findOne({ userID });
  if (exists) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 });
  }

  const randomPassword = "BFT-" + userID.slice(-3) + "-" + generateRandomPassword(6);
  const hashedPassword = await hashValue(randomPassword);

  const user = await User.create({
    userID,
    fullName,
    email,
    password: hashedPassword,
    role,
    isVerified,
  });

  console.log(user);
  return NextResponse.json(
    { message: `Successfully created - ${randomPassword}` },
    { status: 201 }
  );
}

export async function GET() {
  try {
    await connectDB();
    const user = await User.find({});
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectDB();
    const { id } = await req.json();

    if (!id)
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    return NextResponse.json(
      { message: "User deleted successfully", user: deletedUser },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  await connectDB();

  try {
    const body = await req.json();
    const { id, userID, fullName, email, password, role, isVerified } = body;

    if (!id) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    // آماده‌سازی داده‌های بروزرسانی
    const updatedData = {};
    if (userID) updatedData.userID = userID;
    if (fullName) updatedData.fullName = fullName;
    if (email) updatedData.email = email;
    if (role) updatedData.role = role;
    if (typeof isVerified === "boolean") updatedData.isVerified = isVerified;

    // فقط اگر پسورد وارد شده باشد، هش می‌کنیم
    if (password) {
      updatedData.password = await hashValue(password);
    }

    const updatedUser = await User.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "User updated successfully", user: updatedUser },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to update user" },
      { status: 500 }
    );
  }
}
