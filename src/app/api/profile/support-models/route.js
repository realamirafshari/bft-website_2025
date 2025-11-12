import { connectDB } from "@/utils/connectDB";
import { NextResponse } from "next/server";
import SupportModels from "@/models/SupportModels";

export const POST = async (req) => {
  try {
    await connectDB();
    const body = await req.json();

    // اطمینان از وجود داده‌های ضروری
    if (!body.brandName || !body.modelName) {
      return NextResponse.json(
        { message: "brandName and modelName are required" },
        { status: 400 }
      );
    }

    // تبدیل رشته Features به آرایه درصورت ارسال رشته‌ای
    if (typeof body.features === "string") {
      body.features = body.features.split(",").map((f) => f.trim());
    }

    const newModel = await SupportModels.create(body);

    return NextResponse.json(
      { message: "Model added successfully", model: newModel },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error creating model:", err);
    return NextResponse.json(
      { message: "Failed to create model", error: err.message },
      { status: 500 }
    );
  }
};
