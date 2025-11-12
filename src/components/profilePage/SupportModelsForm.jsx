"use client";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const SupportModelsForm = ({ brand }) => {
  const [brandName, setBrandName] = useState("");
  const [modelName, setModelName] = useState("");
  const [modelType, setModelType] = useState("");
  const [chipset, setChipset] = useState("");
  const [androidVersion, setAndroidVersion] = useState("");
  const [image, setImage] = useState("");
  const [features, setFeatures] = useState("");
  const [loading, setLoading] = useState(false);

  const addModelHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    

    try {
      const res = await fetch("/api/profile/support-models", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brandName,
          modelName,
          modelType,
          chipset,
          androidVersion,
          image,
          featurs: features.split(",").map((f) => f.trim()), // 👈 تبدیل رشته به آرایه
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Add Successfuly"); // پاک کردن فرم بعد از موفقیت
        setBrandName("");
        setModelName("");
        setModelType("");
        setChipset("");
        setAndroidVersion("");
        setImage("");
        setFeatures("");
      } else {
        toast.error("somthing went wrong ...");
      }
    } catch (error) {
      toast.error("Faild To Fetch");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-4">
      <Toaster />
      <form
        onSubmit={addModelHandler}
        className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
      >
        <legend className="fieldset-legend">Supported Brand</legend>

        <label className="label">Brand Name</label>
        <select
          value={brandName}
          className="select select-neutral"
          onChange={(e) => setBrandName(e.target.value)}
        >
          <option value="">Select Brand</option>
          {brand.map((item) => (
            <option key={item._id} value={item.brandName}>
              {item.brandName}
            </option>
          ))}
        </select>

        <label className="label">Model Name</label>
        <input
          type="text"
          className="input"
          placeholder="Model Name"
          value={modelName}
          onChange={(e) => setModelName(e.target.value)}
          required
        />

        <label className="label">Model Type</label>
        <input
          type="text"
          className="input"
          placeholder="Model Type"
          value={modelType}
          onChange={(e) => setModelType(e.target.value)}
        />

        <label className="label">Chipset</label>
        <input
          type="text"
          className="input"
          placeholder="Chipset"
          value={chipset}
          onChange={(e) => setChipset(e.target.value)}
        />

        <label className="label">Android Version</label>
        <input
          type="text"
          className="input"
          placeholder="Android Version"
          value={androidVersion}
          onChange={(e) => setAndroidVersion(e.target.value)}
        />

        <label className="label">Image (URL)</label>
        <input
          type="text"
          className="input"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <label className="label">Features (comma separated)</label>
        <input
          type="text"
          className="input"
          placeholder="e.g. NFC, Fast Charging, 5G"
          value={features}
          onChange={(e) => setFeatures(e.target.value)}
        />

        <button
          className="btn btn-neutral mt-4"
          disabled={loading || !brandName}
        >
          {loading ? "Adding ..." : "Add New Model"}
        </button>
      </form>
    </div>
  );
};

export default SupportModelsForm;
