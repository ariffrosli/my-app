import { NextResponse } from "next/server";

// GET request handler
export async function GET() {
  const returnSecureWord = {
    secureWord: "secure123",
    securePic: "https://www.meowbox.com/cdn/shop/articles/Screen_Shot_2024-03-15_at_10.53.41_AM.png?v=1710525250"
  }
  return NextResponse.json(returnSecureWord);
}
