"use client";

import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  const goToTransactionHistory = () => {
    router.push("/transactions");
  };

  const logout = () => {
    router.push("/"); // Route back to HomePage
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen text-black flex flex-col items-center justify-center">
      <div className="bg-white rounded-lg shadow p-8 max-w-lg w-full text-center">
        <h1 className="text-2xl font-bold mb-6">🎉 Welcome to Dashboard!</h1>

        <div className="flex gap-6 justify-center">
          <button
            onClick={goToTransactionHistory}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
          >
            Go to Transaction History
          </button>

          <button
            onClick={logout}
            className="px-6 py-3 bg-red-600 text-white font-medium rounded-lg shadow hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
