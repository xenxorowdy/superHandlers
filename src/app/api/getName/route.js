import { NextResponse } from "next/server";
import { connectToDb } from "../upload/route";

async function getInventory() {
  const { client } = await connectToDb();
  return client
    .db()
    .collection("images.files")
    .find()
    .sort({ uploadDate: -1 })
    .project({ filename: 1, metadata: 1 })
    .toArray();
}

export async function GET() {
  try {
    const result = await getInventory();
    return NextResponse.json({ result });
  } catch (error) {
    console.error("Error fetching inventory:", error);
    return NextResponse.json({ result: [] }, { status: 500 });
  }
}

export async function POST() {
  try {
    const result = await getInventory();
    return NextResponse.json({ result });
  } catch (error) {
    console.error("Error fetching inventory:", error);
    return NextResponse.json({ result: [] }, { status: 500 });
  }
}

