import { NextResponse } from "next/server";

// GET request handler
export async function GET() {
    const transactions = [
        { 
            date: "24 Aug 2023",
            refId: "#834343434342",
            to: "Bloom Enterprise Sdn Bhd",
            transactionType: "DuitNow payment",
            amount: 1200
        },
        { 
            date: "14 Jul 2023",
            refId: "#834343434341",
            to: "Muhammad Andy Asmawi",
            transactionType: "DuitNow payment",
            amount: 54810.16
        },
        { 
            date: "12 Jul 2023",
            refId: "#834343434340",
            to: "Utilities Company Sdn Bhd",
            transactionType: "DuitNow payment",
            amount: 100
        }
    ];

  return NextResponse.json(transactions);
}
