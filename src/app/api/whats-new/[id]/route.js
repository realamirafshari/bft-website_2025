import ChangelogModel from "@/models/Changelog";
import { connectDB } from "@/utils/connectDB";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const body = await req.json();
    const { id } = await params;
    const updated = await ChangelogModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updated)
      return NextResponse.json({ message: "Not found" }, { status: 404 });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
