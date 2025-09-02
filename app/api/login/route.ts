import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  // Just mock success (no real user validation)
  return NextResponse.json({
    success: true,
    message: "Login successful",
    user: username,
  });
}
