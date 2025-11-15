"use client";

import ModelCard from "@/components/supportModel/ModelCard";
import { useEffect, useState, useMemo, useCallback } from "react";
import { IoSearchOutline } from "react-icons/io5";

const PhoneModelPage = () => {
  const [modelsList, setModelsList] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // استفاده از useMemo برای بهینه‌سازی فیلتر کردن
  const searchedPhones = useMemo(() => {
    if (!search.trim()) return modelsList;

    const searchTerm = search.toLowerCase();
    return modelsList.filter(
      (item) =>
        item.modelType?.toLowerCase().includes(searchTerm) ||
        item.modelName?.toLowerCase().includes(searchTerm)
    );
  }, [modelsList, search]);

  // استفاده از useCallback برای بهینه‌سازی
  const fetchHandler = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch("/api/profile/support-models");

      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status}`);
      }

      const data = await res.json();
      setModelsList(data);
    } catch (error) {
      console.error("Error fetching brands:", error);
      setError("Failed to load models. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHandler();
  }, [fetchHandler]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-error text-lg mb-4">{error}</p>
          <button onClick={fetchHandler} className="btn btn-primary">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold  mb-2">Supported Phone Models</h1>
          <p className="">Find your device from our supported models list</p>
        </div>

        {/* Search Section */}
        <div className="max-w-md mb-8 ">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <IoSearchOutline className="h-5 w-5 " />
            </div>
            <input
              type="text"
              className="input"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search Model Name or Model Type..."
            />
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <span className="loading loading-dots loading-xl"></span>
          </div>
        )}

        {/* Results Section */}
        {!isLoading && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold ">
                Available Models
                {search && (
                  <span className="badge badge-secondary  ml-2">
                    ({searchedPhones.length} results)
                  </span>
                )}
              </h2>
            </div>

            {searchedPhones.length === 0 ? (
              <div className="text-center py-12">
                <div className=" text-6xl mb-4">📱</div>
                <h3 className="text-lg font-medium  mb-2">
                  No models found
                </h3>
                <p className="">
                  {search
                    ? "Try adjusting your search terms"
                    : "No models available at the moment"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {searchedPhones.map((item) => (
                  <ModelCard
                    key={item._id}
                    item={item}
                    className="transform hover:scale-105 transition-transform duration-200"
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PhoneModelPage;
