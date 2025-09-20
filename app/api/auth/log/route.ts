import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "log endpoint ok" });
}

export async function POST() {
  return NextResponse.json({ message: "log endpoint ok" });
}