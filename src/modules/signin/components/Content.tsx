"use client";

import { useState } from "react";
import Input from "@/components/shared/Input";
import { useAuth } from "../hooks/useAuth";

interface Credentials {
  email: string;
  password: string;
}

export default function Content() {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState<Credentials>({
    email: "",
    password: "",
  });

  const credentialHandler = (name: keyof Credentials, value: string) => {
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) return;
    login.mutate(credentials);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>

        <form onSubmit={onSubmit} className="space-y-4">
          {/* Email Field */}
          <Input
            label="Email"
            type="text"
            iconClassName="text-gray-500"
            onChange={(value: string) => credentialHandler("email", value)}
            rules={[
              { type: "required" },
              {
                type: "pattern",
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            ]}
          />

          {/* Password Field */}
          <Input
            label="Password"
            type="password"
            enablePasswordToggle
            iconClassName="text-gray-500"
            onChange={(value: string) => credentialHandler("password", value)}
            rules={[
              { type: "required" },
              {
                type: "minLength",
                value: 8,
                message: "Must be at least 8 characters",
              },
            ]}
          />

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition cursor-pointer"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
