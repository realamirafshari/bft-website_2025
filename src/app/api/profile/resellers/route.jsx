import Resellers from "@/models/AuthorizedResellers";
import { connectDB } from "@/utils/connectDB";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    await connectDB();
    const body = await req.json();

    if (!body.sellersName) {
      return NextResponse.json(
        { message: "sellersName is required" },
        { status: 400 }
      );
    }

    const newSeller = await Resellers.create(body);

    return NextResponse.json(
      { message: "Seller added successfully", seller: newSeller },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error creating seller:", err);
    return NextResponse.json(
      { message: "Failed to create seller", error: err.message },
      { status: 500 }
    );
  }
};

export async function GET() {
  try {
    await connectDB();
    const sellers = await Resellers.find({});
    return NextResponse.json(sellers, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
export async function DELETE(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ message: "Seller ID is required" }, { status: 400 });
    }

    const deletedSeller = await Resellers.findByIdAndDelete(id);

    if (!deletedSeller) {
      return NextResponse.json({ message: "Seller not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Seller deleted successfully" }, { status: 200 });
  } catch (err) {
    console.error("Error deleting seller:", err);
    return NextResponse.json({ message: "Failed to delete seller", error: err.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { id, sellersName, country, city, description, status } = body;

    if (!id) {
      return NextResponse.json({ message: "Seller ID is required" }, { status: 400 });
    }

    const updatedSeller = await Resellers.findByIdAndUpdate(
      id,
      { sellersName, country, city, description, status },
      { new: true, runValidators: true }
    );

    if (!updatedSeller) {
      return NextResponse.json({ message: "Seller not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Seller updated successfully", seller: updatedSeller }, { status: 200 });
  } catch (err) {
    console.error("Error updating seller:", err);
    return NextResponse.json({ message: "Failed to update seller", error: err.message }, { status: 500 });
  }
}