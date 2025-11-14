"use client";
import { IoIosPhonePortrait } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import ModelCard from "@/components/supportModel/ModelCard";

const PhoneModels = ({ phoneModels }) => {
  const { phoneModels: phoneParam } = useParams();
  // --- Search State ---
  const [search, setSearch] = useState("");

  const filteredPhone = phoneModels.filter(
    (item) => item.brandName.toLowerCase() === phoneParam.toLowerCase()
  );
  const searchedPhones = filteredPhone.filter(
    (item) =>
      item.modelName.toLowerCase().includes(search.toLowerCase()) ||
      item.brandName.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="p-4 md:p-8 bg-linear-to-br from-gray-50 to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
            Supported Models of {phoneParam}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base px-4">
            All supported models of {phoneParam} brand with complete details and
            features of each device
          </p>
          {/* Search Section */}
          <div className="max-w-md mx-auto mb-6 md:mb-10">
            <div className="flex items-center   rounded-xl px-4 py-3 ">
              <label className="input">
                <IoSearchOutline className="size-5" />
                <input
                  type="text"
                  className="grow"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search Model Nam ..."
                />
              </label>
            </div>
          </div>
        </div>

        {/* Phone Models Grid */}
        {filteredPhone.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {searchedPhones.map((item) => (
              <ModelCard key={item._id} item={item}/>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-12 md:py-16 bg-white rounded-2xl shadow-sm border border-gray-200 max-w-2xl mx-auto">
            <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-4 md:mb-6 bg-linear-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 md:w-16 md:h-16 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-700 mb-2 md:mb-3">
              No Models Found
            </h3>
            <p className="text-gray-500 text-sm md:text-lg max-w-md mx-auto px-4">
              Unfortunately, no models have been registered for the {phoneParam}{" "}
              brand in the system.
            </p>
            <button className="mt-4 md:mt-6 bg-blue-600 text-white px-5 md:px-6 py-2 md:py-2.5 rounded-lg hover:bg-blue-700 transition-colors duration-300 text-sm md:text-base">
              Back to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhoneModels;
