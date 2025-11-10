"use client";
import { signOut } from "next-auth/react";
import { useState } from "react";

const SignOut = () => {
  const [isLoading, setIsLoading] = useState(false);
  const signOutHandler = async () => {
    setIsLoading(true);
    await signOut();
    setIsLoading(false);
  };

  return (
    <button
      className="badge badge-error mt-2 text-white hover:cursor-pointer"
      onClick={signOutHandler}
    >
      {isLoading ? "SignOut..." : "SignOut"}
    </button>
  );
};

export default SignOut;
