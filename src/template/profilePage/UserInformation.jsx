"use client";

import { useState } from "react";
import toast from "react-hot-toast";

const UserInformation = ({ session }) => {
  const [isLoading, setIsLoading] = useState(false);
  console.log(session);
  const [formData, setFormData] = useState({
    userID: session.user.userID || "", // اگر خالی بود حداقل ""
    fullName: session.user.fullName || "",
    email: session.user.email || "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/auth/user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: session.user.id, // فرض بر این که session.user شامل _id هم هست
          ...formData,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to update user");
        return;
      }

      toast.success("User updated successfully");
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update user");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full sm:w-xs border p-4">
        <legend className="fieldset-legend">User Information</legend>

        <label className="label">BFT User ID</label>
        <input
          type="text"
          className="input"
          name="userID"
          value={formData.userID}
          onChange={handleChange}
          disabled
        />

        <label className="label">Full Name</label>
        <input
          type="text"
          className="input"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Optional"
        />

        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Optional"
        />

        <label className="label">Password</label>
        <input
          type="text"
          className="input"
          name="password"
          placeholder="Enter new password"
          value={formData.password}
          onChange={handleChange}
        />

        <button
          className={`btn ${isLoading ? "btn-disabled" : "btn-neutral"} mt-4`}
          onClick={handleSubmit}
        >
          {isLoading ? "Update Information ..." : "Update Information"}
        </button>
      </fieldset>
    </div>
  );
};

export default UserInformation;
