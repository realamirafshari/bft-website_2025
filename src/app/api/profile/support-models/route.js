import { connectDB } from "@/utils/connectDB";
import { NextResponse } from "next/server";
import SupportModels from "@/models/SupportModels";

export const POST = async (req) => {
  try {
    await connectDB();
    const body = await req.json();

    if (!body.brandName || !body.modelName) {
      return NextResponse.json(
        { message: "brandName and modelName are required" },
        { status: 400 }
      );
    }

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

export async function DELETE(req) {
  try {
    await connectDB();
    const { id } = await req.json();
    await SupportModels.deleteOne({ _id: id });
    return NextResponse.json(
      { message: "Delete successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const brands = await SupportModels.find({});
    return NextResponse.json(brands, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id"); // گرفتن id از query

    if (!id) {
      return NextResponse.json(
        { message: "Model id is required" },
        { status: 400 }
      );
    }

    const body = await req.json();

    if (!body.brandName || !body.modelName) {
      return NextResponse.json(
        { message: "brandName and modelName are required" },
        { status: 400 }
      );
    }

    if (typeof body.features === "string") {
      body.features = body.features.split(",").map((f) => f.trim());
    }

    const updatedModel = await SupportModels.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );

    if (!updatedModel) {
      return NextResponse.json({ message: "Model not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Model updated successfully", model: updatedModel },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error updating model:", err);
    return NextResponse.json(
      { message: "Failed to update model", error: err.message },
      { status: 500 }
    );
  }
}
