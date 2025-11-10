"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaUserLarge, FaAt, FaLock } from "react-icons/fa6";
import VerifyOtp from "./VerifyOtp";
import Link from "next/link";

const Signup = () => {
  const [fullName, setFullName] = useState("amir");
  const [email, setEmail] = useState("amirafshari02@gmail.com");
  const [password, setPassword] = useState("Amir_Afshari#1382");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  const signupHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/sendOtp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Something went wrong.");
        setIsLoading(false);
        return;
      }

      toast.success("OTP sent successfully!");
      setTimeout(() => setStep(2), 1000);
      
    } catch (err) {
      console.error("SIGNUP ERROR:", err);
      toast.error("Server error. Try again later.");
    }

    setIsLoading(false);
  };

  return (
    <div className="py-32 flex justify-center">
      <Toaster position="top-center" />

      {step === 1 && (
        <form className="flex justify-center" onSubmit={signupHandler}>
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">Create Account</legend>

            <label className="label">Full Name</label>
            <label className="input validator">
              <FaUserLarge />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
                required
              />
            </label>

            <label className="label">Email</label>
            <label className="input validator">
              <FaAt />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="mail@example.com"
                required
              />
            </label>

            <label className="label">Password</label>
            <label className="input validator">
              <FaLock />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must contain uppercase, lowercase and a number."
              />
            </label>

            <button
              type="submit"
              className={`btn mt-4 ${
                isLoading ? "btn-disabled" : "btn-neutral"
              }`}
            >
              {isLoading && <span className="loading loading-spinner" />}
              {isLoading ? "Loading..." : "Create Account"}
            </button>

            <h1 className="mx-auto mt-2">
              If you already have an account ,
              <Link href={"/signin"} className="text-primary underline">
                Signin
              </Link>
            </h1>
          </fieldset>
        </form>
      )}

      {step === 2 && <VerifyOtp email={email} />}
    </div>
  );
};

export default Signup;
