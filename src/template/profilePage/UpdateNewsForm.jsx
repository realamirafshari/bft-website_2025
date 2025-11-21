"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const UpdateNewsForm = ({
  editingItem,
  setEditingItem,
  updateList,
  setUpdateList,
}) => {
  const [formData, setFormData] = useState({
    version: "",
    title: "",
    description: "",
    releaseDate: new Date().toISOString(), // ذخیره با زمان کامل
    features: [""],
    supportDevice: [""],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingItem) {
      setFormData({
        version: editingItem.version || "",
        title: editingItem.title || "",
        description: editingItem.description || "",
        releaseDate: editingItem.releaseDate || new Date().toISOString(),
        features: editingItem.features?.length ? editingItem.features : [""],
        supportDevice: editingItem.supportDevice?.length
          ? editingItem.supportDevice
          : [""],
      });
    }
  }, [editingItem]);

  const updateField = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const addFeature = () => updateField("features", [...formData.features, ""]);
  const removeFeature = (index) =>
    updateField(
      "features",
      formData.features.filter((_, i) => i !== index)
    );
  const updateFeature = (index, value) => {
    const copy = [...formData.features];
    copy[index] = value;
    updateField("features", copy);
  };

  const addDevice = () =>
    updateField("supportDevice", [...formData.supportDevice, ""]);
  const removeDevice = (index) =>
    updateField(
      "supportDevice",
      formData.supportDevice.filter((_, i) => i !== index)
    );
  const updateDevice = (index, value) => {
    const copy = [...formData.supportDevice];
    copy[index] = value;
    updateField("supportDevice", copy);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const bodyData = {
      ...formData,
      features: formData.features.filter((f) => f.trim() !== ""),
      supportDevice: formData.supportDevice.filter((d) => d.trim() !== ""),
    };

    try {
      let res;
      if (editingItem) {
        res = await fetch(`/api/whats-new/${editingItem._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bodyData),
        });
      } else {
        res = await fetch("/api/whats-new", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bodyData),
        });
      }

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Operation failed");
        return;
      }

      toast.success(editingItem ? "Updated successfully!" : "Created successfully!");

      if (editingItem) {
        setUpdateList((prev) =>
          prev.map((item) => (item._id === editingItem._id ? data : item))
        );
        setEditingItem(null);
      } else {
        // جدیدترین اول
        setUpdateList((prev) => [data, ...prev]);
      }

      setFormData({
        version: "",
        title: "",
        description: "",
        releaseDate: new Date().toISOString(),
        features: [""],
        supportDevice: [""],
      });
    } catch (error) {
      toast.error("Network error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
    
      <div className="card bg-base-100">
        <div className="card-body">
          <h1 className="card-title text-3xl font-bold mb-2">
            {editingItem ? "Edit Update" : "Create Update News"}
          </h1>
          <p className="mb-6">Add new changelog entry for your application</p>

          <form onSubmit={submitHandler} className="space-y-6">
            {/* Version & Title */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Version *</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., 1.2.0"
                  className="input input-bordered w-full"
                  value={formData.version}
                  onChange={(e) => updateField("version", e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Update title"
                  className="input input-bordered w-full"
                  value={formData.title}
                  onChange={(e) => updateField("title", e.target.value)}
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="label">
                <span className="label-text font-semibold">Description</span>
              </label>
              <textarea
                rows="4"
                placeholder="Describe what's new..."
                className="textarea textarea-bordered w-full"
                value={formData.description}
                onChange={(e) => updateField("description", e.target.value)}
              />
            </div>

            {/* Release Date */}
            <div>
              <label className="label">
                <span className="label-text font-semibold">Release Date</span>
              </label>
              <input
                type="date"
                className="input w-full"
                value={formData.releaseDate.split("T")[0]}
                onChange={(e) => {
                  const isoDate = new Date(e.target.value).toISOString();
                  updateField("releaseDate", isoDate);
                }}
              />
            </div>

            {/* Features */}
            <div className="p-4 bg-base-200">
              <label className="label">
                <span className="label-text font-semibold">Features</span>
              </label>
              <div className="space-y-2 mb-3">
                {formData.features.map((feature, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <input
                      type="text"
                      placeholder={`Feature #${idx + 1}`}
                      className="input input-bordered w-full input-sm"
                      value={feature}
                      onChange={(e) => updateFeature(idx, e.target.value)}
                    />
                    {formData.features.length > 1 && (
                      <button
                        type="button"
                        className="btn btn-error btn-sm btn-square"
                        onClick={() => removeFeature(idx)}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button type="button" className="btn btn-success btn-sm" onClick={addFeature}>
                + Add Feature
              </button>
            </div>

            {/* Supported Devices */}
            <div className="p-4 bg-base-200">
              <label className="label">
                <span className="label-text font-semibold">Supported Devices</span>
              </label>
              <div className="space-y-2 mb-3">
                {formData.supportDevice.map((device, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <input
                      type="text"
                      placeholder={`Device #${idx + 1}`}
                      className="input input-bordered w-full input-sm"
                      value={device}
                      onChange={(e) => updateDevice(idx, e.target.value)}
                    />
                    {formData.supportDevice.length > 1 && (
                      <button
                        type="button"
                        className="btn btn-error btn-sm btn-square"
                        onClick={() => removeDevice(idx)}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button type="button" className="btn btn-success btn-sm" onClick={addDevice}>
                + Add Device
              </button>
            </div>

            <div className="flex justify-end pt-4">
              <button type="submit" className="btn btn-primary px-8" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner"></span> Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateNewsForm;
