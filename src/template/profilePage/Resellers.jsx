"use client";

import { useState, useEffect } from "react";
import { RiRefreshLine } from "react-icons/ri";
import { BiCurrentLocation, BiWorld } from "react-icons/bi";
import toast from "react-hot-toast";

const ResellersPage = () => {
  const [sellersName, setSellersName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("active");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [resellers, setResellers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingSeller, setEditingSeller] = useState(null);

  // Fetch resellers
  const fetchResellers = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/profile/resellers");
      if (!res.ok) throw new Error("Failed to fetch resellers");
      const data = await res.json();
      setResellers(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load resellers");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchResellers();
  }, []);

  // Add or update reseller
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const body = {
        sellersName,
        country: country.split(",").map((c) => c.trim()),
        city,
        description: description.trim(), // ذخیره به صورت رشته
        status,
      };

      const res = await fetch("/api/profile/resellers", {
        method: editingSeller ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingSeller ? { ...body, id: editingSeller._id } : body),
      });

      if (!res.ok) throw new Error("Failed to save reseller");

      toast.success(editingSeller ? "Reseller updated!" : "Reseller added successfully!");
      resetForm();
      fetchResellers();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete reseller
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this reseller?")) return;

    try {
      const res = await fetch("/api/profile/resellers", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error("Failed to delete reseller");

      toast.success("Reseller deleted!");
      fetchResellers();
    } catch (err) {
      console.error(err);
      toast.error("Delete failed!");
    }
  };

  // Open edit form
  const openEditForm = (seller) => {
    setEditingSeller(seller);
    setSellersName(seller.sellersName || "");
    setCountry(seller.country?.join(", ") || "");
    setCity(seller.city || "");
    setDescription(seller.description || ""); // رشته است
    setStatus(seller.status || "active");
  };

  // Reset form
  const resetForm = () => {
    setSellersName("");
    setCountry("");
    setCity("");
    setDescription("");
    setStatus("active");
    setEditingSeller(null);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-primary">Reseller Management</h1>
          <p className="max-w-2xl mx-auto">Manage your authorized resellers and partners worldwide</p>
        </div>

        {/* Add/Edit Form */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="card border border-base-300 rounded-2xl overflow-hidden">
            <div className="card-body p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">{editingSeller ? "Edit Reseller" : "Add New Reseller"}</h2>
                {editingSeller && (
                  <button
                    onClick={resetForm}
                    className="btn btn-ghost btn-sm text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Seller Name *</span>
                    </label>
                    <input
                      type="text"
                      value={sellersName}
                      onChange={(e) => setSellersName(e.target.value)}
                      placeholder="Enter seller name"
                      className="input input-bordered w-full focus:input-primary"
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Status</span>
                    </label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="select select-bordered w-full focus:select-primary"
                    >
                      <option value="active">Active</option>
                      <option value="unactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Countries</span>
                      <span className="ml-1">(Comma separated)</span>
                    </label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="e.g. USA, Canada, UK"
                      className="input input-bordered w-full focus:input-primary"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">City</span>
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Enter city"
                      className="input input-bordered w-full focus:input-primary"
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Description</span>
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter description about this reseller (comma separated)"
                    className="textarea textarea-bordered w-full h-24 focus:textarea-primary"
                    rows={3}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className={`btn btn-primary flex-1 ${isSubmitting ? "loading" : ""}`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? editingSeller
                        ? "Updating..."
                        : "Adding..."
                      : editingSeller
                      ? "Update Reseller"
                      : "Add Reseller"}
                  </button>
                  {editingSeller && (
                    <button type="button" onClick={resetForm} className="btn btn-outline btn-error">
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Resellers List */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              Resellers List
              {resellers.length > 0 && (
                <span className="ml-2 text-sm font-normal">
                  ({resellers.length} {resellers.length === 1 ? "reseller" : "resellers"})
                </span>
              )}
            </h2>

            {resellers.length > 0 && (
              <button onClick={fetchResellers} className="btn btn-ghost btn-sm gap-2">
                <RiRefreshLine />
                Refresh
              </button>
            )}
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-16">
              <div className="text-center">
                <div className="loading loading-dots loading-lg mb-4"></div>
                <p>Loading resellers...</p>
              </div>
            </div>
          ) : resellers.length === 0 ? (
            <div className="card border border-base-300 rounded-2xl">
              <div className="card-body text-center py-16">
                <h3 className="text-xl font-semibold mb-2">No Resellers Found</h3>
                <p>Get started by adding your first reseller above.</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resellers.map((seller, index) => (
                <div
                  key={seller._id}
                  className="card bg-base-200 shadow-md border-0 rounded-xl overflow-hidden transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="card-body p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="card-title text-lg font-bold line-clamp-1">{seller.sellersName}</h3>
                      <div
                        className={`badge badge-lg ${
                          seller.status === "active" ? "badge-success" : "badge-error"
                        } badge-outline`}
                      >
                        {seller.status}
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      {seller.country?.length > 0 && (
                        <div className="flex items-center text-sm">
                          <BiWorld className="mr-2" />
                          <span>{seller.country.join(", ")}</span>
                        </div>
                      )}

                      {seller.city && (
                        <div className="flex items-center text-sm">
                          <BiCurrentLocation className="mr-2" />
                          <span>{seller.city}</span>
                        </div>
                      )}

                      {seller.description && (
                        <ul className="pt-2 border-t border-gray-100 list-disc list-inside text-sm">
                          {seller.description.split(",").map((desc, i) => (
                            <li key={i}>{desc.trim()}</li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div className="card-actions justify-end">
                      <div className="flex gap-2">
                        <button onClick={() => openEditForm(seller)} className="btn btn-warning btn-outline gap-1">
                          Edit
                        </button>
                        <button onClick={() => handleDelete(seller._id)} className="btn btn-error gap-1">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResellersPage;
