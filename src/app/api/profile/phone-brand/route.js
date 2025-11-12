import PhoneBrand from "@/models/PhoneBrans";
import { connectDB } from "@/utils/connectDB";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const { brandName, brandLogo } = await req.json();

    const existingBrand = await PhoneBrand.findOne({ brandName });
    if (existingBrand) {
      return NextResponse.json(
        { message: "Brand already used." },
        { status: 422 }
      );
    }

    await PhoneBrand.create({ brandName, brandLogo });

    return NextResponse.json(
      { message: "Brand created successfully!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const brands = await PhoneBrand.find({});
    return NextResponse.json(brands, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}


export async function DELETE(req) {
  try {
    await connectDB();
    const {id}= await req.json()
     await PhoneBrand.deleteOne({_id:id});
    return NextResponse.json({message:"Delete successfully"}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}