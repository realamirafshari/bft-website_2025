// components/VerifyOtp.jsx
"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function VerifyOtp({ email }) {
  const router = useRouter();
  const [otpCode, setOtpCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/verifyOtp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otpCode: otpCode }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Verification failed.");
        return;
      }

      toast.success("Account created successfully!");

      setTimeout(() => router.push("/signin"), 1000);
    } catch (err) {
      console.error(err);
      toast.error("Server error.");
    } finally {
      setIsLoading(false);
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
            value={otpCode}
            onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
            placeholder="••••••"
            className="text-center tracking-widest text-2xl font-semibold"
            required
          />
        </label>

        <button
          type="submit"
          className={`btn ${isLoading ? "btn-disabled" : "btn-neutral"} mt-2`}
        >
          {isLoading && <span className="isLoading isLoading-spinner" />}

          {isLoading ? "Verifying..." : "Verify"}
        </button>
      </fieldset>
    </form>
  );
}
