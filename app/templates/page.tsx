"use client";

import { useRouter } from "next/navigation";

export default function TemplatePage() {
  const router = useRouter();

  return (
    <div className="bg-gray-50 min-h-screen text-black px-4 md:px-6 py-6">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Template</h1>
        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
        >
          ← Back to Home Page
        </button>
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-700 text-sm">
          Some templates over here.
        </p>
      </div>
    </div>
  );
}
