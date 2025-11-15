import ChangelogModel from "@/models/Changelog";
import { connectDB } from "@/utils/connectDB";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const newItem = await ChangelogModel.create(body);
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const list = await ChangelogModel.find({}).sort({ releaseDate: -1 }).lean();
    return NextResponse.json(list, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}


export async function DELETE(req) {
  try {
    await connectDB();
    const { id } = await req.json();
    await ChangelogModel.deleteOne({ _id: id });
    return NextResponse.json(
      { message: "Delete successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}