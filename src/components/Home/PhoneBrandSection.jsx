"use client";

import { useState, useEffect, useCallback } from "react";
import SectionTitle from "./SectionTitle";
import Link from "next/link";

const PhoneBrandSection = () => {
  const [brandList, setBrandList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHandler = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch("/api/profile/phone-brand");

      if (!res.ok) {
        throw new Error(`Failed to fetch brands: ${res.status}`);
      }

      const data = await res.json();
      setBrandList(data);
    } catch (error) {
      console.error("Error fetching brands:", error);
      setError("Unable to load brands. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHandler();
  }, [fetchHandler]);

  if (error) {
    return (
      <div className="pt-12">
        <SectionTitle titleText={"Supported Brands"} />
        <div className="text-center py-12">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button onClick={fetchHandler} className="btn btn-primary">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="pt-12 pb-16">
      <div className="container mx-auto px-4">
        <SectionTitle titleText={"Supported Brands"} />

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <span className="loading loading-dots loading-xl"></span>
          </div>
        )}

        {/* Brands Grid */}
        {!isLoading && brandList.length > 0 && (
          <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mt-8">
            {brandList.map((brand) => (
              <Link
                href={`/models/${encodeURIComponent(
                  brand.brandName.toLowerCase()
                )}`}
                key={brand._id}
                className="group relative rounded-2xl shadow-sm border border-primary hover:border-primary transition-all duration-300 p-6 hover:scale-105"
              >
                <div className="flex flex-col items-center text-center">
                  {/* Brand Logo */}
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden p-3">
                    {brand.brandLogo ? (
                      <img
                        src={brand.brandLogo}
                        alt={`${brand.brandName} logo`}
                        className="object-contain rounded-2xl transition-transform duration-300 "
                        sizes="100px"
                      />
                    ) : (
                      <div className="w-full h-full  rounded-lg flex items-center justify-center">
                        <span className="text-gray-400 text-sm">No Logo</span>
                      </div>
                    )}
                  </div>

                  {/* Brand Name */}
                  <div className="">
                    <span className=" font-semibold text-lg group-hover:text-primary transition-colors duration-300">
                      {brand.brandName}
                    </span>
                    <p className=" text-sm mt-1 group-hover:text-primary transition-colors duration-300">
                      Supported Devices
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && brandList.length === 0 && (
          <div className="text-center py-12">
            <div className=" text-6xl mb-4">📱</div>
            <h3 className="text-xl font-semibold  mb-2">No Brands Available</h3>
            <p className=" max-w-md mx-auto">
              Currently there are no supported phone brands in the system.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PhoneBrandSection;
