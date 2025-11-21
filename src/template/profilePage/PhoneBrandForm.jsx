"use client";

import { useState } from "react";
import toast from "react-hot-toast";

const PhoneBrandForm = () => {
  const [brandName, setBrandName] = useState("");
  const [brandLogo, setBrandLogo] = useState("");

  const addHandler = async (e) => {
    e.preventDefault();
    if (!brandName || !brandLogo) {
      toast.error("Fill all fields");
      return;
    }
    const res = await fetch("/api/profile/phone-brand", {
      method: "POST",
      body: JSON.stringify({ brandName, brandLogo }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (!res.ok) {
      toast.error("this brand already exist");
    } else {
      toast.success("Brand Created");
      setBrandName("");
      setBrandLogo("");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full sm:w-xs  border p-4">
        <legend className="fieldset-legend">Phone Brand Form</legend>

        <label className="label">Name Brand</label>
        <input
          type="text"
          className="input"
          placeholder="Name Brand"
          onChange={(e) => setBrandName(e.target.value)}
          value={brandName}
        />

        <label className="label">Logo</label>
        <input
          type="text"
          className="input"
          placeholder="Brand Logo"
          onChange={(e) => setBrandLogo(e.target.value)}
          value={brandLogo}
        />

        <button className="btn btn-neutral mt-4" onClick={addHandler}>
          Add Brands
        </button>
      </fieldset>
    </div>
  );
};

export default PhoneBrandForm;
