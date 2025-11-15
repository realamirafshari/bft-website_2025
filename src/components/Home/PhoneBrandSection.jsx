"use client";

import { useState, useEffect } from "react";
import SectionTitle from "./SectionTitle";
import Link from "next/link";

const PhoneBrandSection = () => {
  const [brandList, setBrandList] = useState([]);

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const res = await fetch("/api/profile/phone-brand");
        if (!res.ok) {
          console.error("Failed to fetch brands");
          return;
        }
        const data = await res.json();
        setBrandList(data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchHandler();
  }, []);

  return (
    <div className="pt-12">
      <SectionTitle titleText={"Supported Brands"} />

      <div className="mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 items-center max-w-4xl mt-12">
        {brandList.map((brand) => (
          <Link
            href={`/models/${brand.brandName}`}
            key={brand._id}
            className="group rounded-2xl flex justify-center items-center transition-all border border-primary hover:scale-110 duration-500 p-6"
          >
            <div>
              <img
                src={brand.brandLogo}
                alt={`${brand.brandName} logo`}
                className="mx-auto w-22 rounded-2xl"
              />
              <div className="mt-4 text-center">
                <span className="text-text font-medium group-hover:text-primary">
                  {brand.brandName} Devices
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PhoneBrandSection;