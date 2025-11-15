"use client";
import { IoSearchOutline } from "react-icons/io5";
import { useParams, useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import ModelCard from "@/components/supportModel/ModelCard";
import { FaRegFaceSmile } from "react-icons/fa6";

const PhoneModels = ({ phoneModels }) => {
  const router = useRouter();
  const { phoneModels: phoneParam } = useParams();
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { filteredPhone, searchedPhones } = useMemo(() => {
    const brandFiltered = phoneModels.filter(
      (item) => item.brandName?.toLowerCase() === phoneParam?.toLowerCase()
    );

    const searchFiltered = brandFiltered.filter(
      (item) =>
        item.modelName?.toLowerCase().includes(search.toLowerCase()) ||
        item.modelType?.toLowerCase().includes(search.toLowerCase())
    );

    return { filteredPhone: brandFiltered, searchedPhones: searchFiltered };
  }, [phoneModels, phoneParam, search]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleBackToHome = () => {
    setIsLoading(true);
    router.push("/");
  };

  if (!phoneParam) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-error text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-bold  mb-2">Invalid Brand</h3>
          <p className=" mb-4">Brand parameter is missing</p>
          <button onClick={handleBackToHome} className="btn btn-primary">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  py-8">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold  mb-3">
            Supported <span className="text-primary">{phoneParam.toUpperCase()}</span> Models
          </h1>
          <p className=" text-lg max-w-2xl mx-auto">
            Explore all supported {phoneParam} models with complete
            specifications and features
          </p>
        </div>

        {/* Search Section */}
        <div className="  mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex w-full pointer-events-none">
              <IoSearchOutline className="h-5 w-5" />
            </div>
            <input
              type="text"
              className=" input "
              value={search}
              onChange={handleSearchChange}
              placeholder="Search Model Name or Model Type..."
            />
          </div>
        </div>

        {/* Results Info */}
        {search && (
          <div className="text-center mb-6">
            <p className="">
              Found
              <span className="font-semibold text-info">
                {searchedPhones.length}
              </span>
              models matching "{search}"
            </p>
          </div>
        )}

        {/* Models Grid */}
        {filteredPhone.length > 0 ? (
          <>
            {searchedPhones.length === 0 ? (
              <div className="text-center py-12  rounded-2xl border border-base-300">
                <div className=" text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold  mb-2">No Models Found</h3>
                <p className=" mb-6">
                  No models found for "{search}". Try different search terms.
                </p>
                <button
                  onClick={() => setSearch("")}
                  className="btn btn-outline"
                >
                  Clear Search
                </button>
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
        ) : (
          /* Empty State - No models for brand */
          <div className="text-center py-16  max-w-2xl mx-auto">
            <div className=" mx-auto mb-6  rounded-full flex items-center justify-center">
              <FaRegFaceSmile className="text-8xl" />

            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              No Models Available
            </h3>
            <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
              Currently, there are no supported models registered for the{" "}
              <span className="font-semibold">{phoneParam}</span> brand in our
              system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleBackToHome}
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Back to Home"}
              </button>
             
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhoneModels;
