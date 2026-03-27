import { getInventory } from "@/lib/inventory";
import { NextResponse } from "next/server";


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
