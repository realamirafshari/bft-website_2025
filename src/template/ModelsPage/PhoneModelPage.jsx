"use client";

import ModelCard from "@/components/supportModel/ModelCard";
import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

const PhoneModelPage = ({ phoneModels }) => {
  const [search, setSearch] = useState("");

  const searchedPhones = phoneModels.filter(
    (item) =>
      item.modelType.toLowerCase().includes(search.toLowerCase()) ||
      item.brandName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className=" mx-auto mb-6 md:mb-10 ">
        <div className="flex items-center justify-center lg:justify-start">
          <label className="input">
            <IoSearchOutline className="size-5" />
            <input
              type="text"
              className="grow"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Model Name ..."
            />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {searchedPhones.map((item) => (
          <ModelCard key={item._id} item={item} />
        ))}
      </div>
    </>
  );
};

export default PhoneModelPage;
