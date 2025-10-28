"use client";
import { useState } from "react";

export default function AuthPage() {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("sagar");
  const [email, setEmail] = useState("i@gmail.com");
  const [password, setPassword] = useState("0000");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = mode === "login" ? "/api/login" : "/api/register";

    const body =
      mode === "login" ? { email, password } : { name, email, password };

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    console.log(body);

    const data = await res.json();
    console.log(data);
    setMessage(
      data.error || (mode === "login" ? "✅ Logged in!" : "🎉 Account created!")
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {mode === "login" ? "Login" : "Register"}
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {mode === "register" && (
            <input
              type="text"
              placeholder="Full Name"
              className="border p-2 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}

          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="bg-blue-600 text-white py-2 rounded">
            {mode === "login" ? "Login" : "Register"}
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-4">
          {mode === "login" ? (
            <>
              Don’t have an account?{" "}
              <button
                onClick={() => setMode("register")}
                className="text-blue-600 hover:underline"
              >
                Register
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setMode("login")}
                className="text-blue-600 hover:underline"
              >
                Login
              </button>
            </>
          )}
        </p>

        {message && <p className="text-center text-red-500 mt-4">{message}</p>}
      </div>
    </div>
  );
}
