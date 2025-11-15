"use client";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const SupportModelsForm = ({ brand, editModel, onUpdate }) => {
  const [brandName, setBrandName] = useState("");
  const [modelName, setModelName] = useState("");
  const [modelType, setModelType] = useState("");
  const [chipset, setChipset] = useState("");
  const [androidVersion, setAndroidVersion] = useState("");
  const [image, setImage] = useState("");
  const [features, setFeatures] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editModel) {
      setBrandName(editModel.brandName);
      setModelName(editModel.modelName);
      setModelType(editModel.modelType || "");
      setChipset(editModel.chipset || "");
      setAndroidVersion(editModel.androidVersion || "");
      setImage(editModel.image || "");
      setFeatures(editModel.features?.join(", ") || "");
    } else {
      setBrandName("");
      setModelName("");
      setModelType("");
      setChipset("");
      setAndroidVersion("");
      setImage("");
      setFeatures("");
    }
  }, [editModel]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const method = editModel ? "PUT" : "POST";
      const url = "/api/profile/support-models" + (editModel ? `?id=${editModel._id}` : "");

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brandName,
          modelName,
          modelType,
          chipset,
          androidVersion,
          image,
          features: features.split(",").map((f) => f.trim()),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(editModel ? "Updated Successfully" : "Added Successfully");
        setBrandName("");
        setModelName("");
        setModelType("");
        setChipset("");
        setAndroidVersion("");
        setImage("");
        setFeatures("");
        if (onUpdate) onUpdate();
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to fetch");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-4">
      <Toaster />
      <form
        onSubmit={submitHandler}
        className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
      >
        <legend className="fieldset-legend">{editModel ? "Edit Model" : "Add Model"}</legend>

        <label className="label">Brand Name</label>
        <select
          value={brandName}
          className="select select-neutral"
          onChange={(e) => setBrandName(e.target.value)}
          required
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
          disabled={loading || !brandName || !modelName}
        >
          {loading ? (editModel ? "Updating ..." : "Adding ...") : editModel ? "Update Model" : "Add New Model"}
        </button>
      </form>
    </div>
  );
};

export default SupportModelsForm;
