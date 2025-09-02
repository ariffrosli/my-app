"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Transaction {
    date: string;
    refId: string;
    to: string;
    transactionType: string;
    amount: number;
}

export default function TransactionsPage() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const router = useRouter();

    useEffect(() => {
        fetch("/api/transaction-history")
            .then((res) => res.json())
            .then((data) => setTransactions(data));
    }, []);

    return (
        <div className="p-6 bg-gray-50 min-h-screen text-black">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-semibold">Transaction History</h1>
                <button
                    onClick={() => router.push("/dashboard")}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                >
                    ← Back to Dashboard
                </button>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block">
                <table className="w-full border-collapse text-sm text-black">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="p-3 font-bold">Date</th>
                            <th className="p-3 font-bold">Reference ID</th>
                            <th className="p-3 font-bold">To</th>
                            <th className="p-3 font-bold">Transaction Type</th>
                            <th className="p-3 font-bold text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((tx, i) => (
                            <tr key={i} className="border-b border-gray-200 last:border-none bg-white">
                                <td className="p-3">{tx.date}</td>
                                <td className="p-3">{tx.refId}</td>
                                <td className="p-3">
                                    <div className="font-medium text-black">{tx.to}</div>
                                    <div className="text-gray-500 text-xs">
                                        Recipient references will go here…
                                    </div>
                                </td>
                                <td className="p-3">{tx.transactionType}</td>
                                <td className="p-3 text-right font-medium">
                                    {tx.amount.toLocaleString("en-MY", {
                                        style: "currency",
                                        currency: "MYR",
                                        minimumFractionDigits: 2,
                                    })}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card Layout */}
            <div className="space-y-4 md:hidden">
                {transactions.map((tx, i) => (
                    <div
                        key={i}
                        className="bg-white rounded-lg shadow p-4 text-sm"
                    >
                        <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                            <div className="font-bold">Date</div>
                            <div>{tx.date}</div>

                            <div className="font-bold">Reference ID</div>
                            <div>{tx.refId}</div>

                            <div className="font-bold">To</div>
                            <div>
                                <div className="font-medium text-black">{tx.to}</div>
                                <div className="text-gray-500 text-xs">
                                    Recipient references will go here…
                                </div>
                            </div>

                            <div className="font-bold">Transaction Type</div>
                            <div>{tx.transactionType}</div>

                            <div className="font-bold">Amount</div>
                            <div className="text-left font-medium">
                                {tx.amount.toLocaleString("en-MY", {
                                    style: "currency",
                                    currency: "MYR",
                                    minimumFractionDigits: 2,
                                })}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
