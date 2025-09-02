"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import bcrypt from "bcryptjs";

export default function LoginPage() {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [secureWord, setSecureWord] = useState("");
  const [securePic, setSecurePic] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const router = useRouter();

  // Step 1: Submit username
  const handleUsernameSubmit = async () => {
    if (!username) {
      setError("⚠️ Username is required");
      return;
    }
    setError("");

    const res = await fetch("./api/getSecureWord");
    const data = await res.json();
    setSecureWord(data.secureWord);
    setSecurePic(data.securePic);
    setStep(2);
  };

  // Step 2: Move to password input
  const handleNext = () => setStep(3);

  // Step 3: Submit password
  const handleLogin = async () => {
    if (!password) {
      setError("⚠️ Password is required");
      return;
    }
    setError("");

    const hashedPassword = await bcrypt.hash(password, 10);

    const res = await fetch("./api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password: hashedPassword }),
    });

    const data = await res.json();
    if (data.success) {
      setSuccessMsg("✅ Login successful! Redirecting...");
      setTimeout(() => router.push("/dashboard"), 1500);
    } else {
      setError("❌ Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h1>

        {/* Step 1: Username */}
        {step === 1 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full border rounded-md p-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              onClick={handleUsernameSubmit}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-md font-semibold transition"
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 2: Secure Word */}
        {step === 2 && (
          <div className="text-center">
            <div className="mb-6 flex justify-center">
            <img
              src={securePic}
              alt="Secure Word"
              className="w-24 h-24 object-contain border rounded-lg shadow"
            />
          </div>
            <p className="mb-4 text-gray-700">
              🔐 Secure Word:{" "}
              <span className="font-semibold text-blue-600">{secureWord}</span>
            </p>
            <button
              onClick={handleNext}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-md font-semibold transition"
            >
              Next
            </button>
          </div>
        )}

        {/* Step 3: Password */}
        {step === 3 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full border rounded-md p-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              onClick={handleLogin}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-md font-semibold transition"
            >
              Login
            </button>
          </div>
        )}

        {/* Messages */}
        {error && (
          <p className="text-red-600 text-sm mt-3 text-center">{error}</p>
        )}
        {successMsg && (
          <p className="text-green-600 text-sm mt-3 text-center">{successMsg}</p>
        )}
      </div>
    </div>
  );
}
