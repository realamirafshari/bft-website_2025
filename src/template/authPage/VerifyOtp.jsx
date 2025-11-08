// components/VerifyOtp.jsx
"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function VerifyOtp({ email }) {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/verifyOtp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: code }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Verification failed.");
        return;
      }

      toast.success("Account created successfully!");

      router.push("/signin");
    } catch (err) {
      console.error(err);
      toast.error("Server error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="w-xs p-4">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Verify OTP</legend>

        <label className="input validator">
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            pattern="\d{6}"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            placeholder="••••••"
            className="text-center tracking-widest text-2xl font-semibold"
            required
          />
        </label>

        <button
          type="submit"
          className="btn btn-neutral mt-2"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
      </fieldset>
    </form>
  );
}
