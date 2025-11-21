"use client";

import { signIn } from "next-auth/react";
import { MdOutlineLock, MdOutlinePassword } from "react-icons/md";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Signin = () => {
  const router = useRouter();
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const signinHandler = async (e) => {
    e.preventDefault();

    if (!userID.trim()) {
      toast.error("Values cannot be empty");
      return;
    }

    try {
      setIsLoading(true);
      const res = await signIn("credentials", {
        userID,
        password,
        redirect: false,
      });

      if (!res) {
        toast.error("Failed to fetch data");
        return;
      }

      if (!res.ok) {
        toast.error("User not found");
        return;
      }

      toast.success("Login Successfully");
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (err) {
      console.error(err);
      toast.error("Error connecting to the server...");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-h-screen flex flex-col justify-center py-46">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 mx-auto">
        <legend className="fieldset-legend">Login</legend>

        <label className="label">BFT User ID</label>
        <label className="input validator">
          <MdOutlinePassword />
          <input
            type="text"
            placeholder="Enter Your BFT User ID"
            required
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
          />
        </label>

        <label className="input validator">
          <MdOutlineLock />
          <input
            type="text"
            placeholder="Enter Your Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button
          className={`btn ${isLoading ? "btn-disabled" : "btn-neutral"} mt-4`}
          onClick={signinHandler}
        >
          {isLoading && <span className="loading loading-spinner" />}
          {isLoading ? "Login ..." : "Login"}
        </button>
      </fieldset>
    </div>
  );
};

export default Signin;
