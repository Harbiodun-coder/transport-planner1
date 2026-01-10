"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const found = users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (!found) {
      alert("Invalid credentials");
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(found));

    alert("Login successful");
    router.push("/app/journey-planner");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Welcome Back</h1>

        <input
          className="border p-3 w-full mb-3 rounded"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-3 w-full mb-4 rounded"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-700 text-white p-3 rounded-lg"
        >
          Login
        </button>

        <p
          className="text-center mt-4 text-sm cursor-pointer text-blue-700"
          onClick={() => router.push("/auth/register")}
        >
          Create an account
        </p>
      </div>
    </div>
  );
}
