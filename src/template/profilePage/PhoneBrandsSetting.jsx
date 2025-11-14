"use client";
import PhoneBrandForm from "@/components/profilePage/PhoneBrandForm";
import { useEffect, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";

const PhoneBrandsSetting = () => {
  const [brandList, setBrandList] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await fetch("/api/profile/phone-brand");
        const data = await res.json();
        setBrandList(data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };
    fetchBrands();
  }, []);

  const deleteHandler = async (id) => {
    try {
      const res = await fetch("/api/profile/phone-brand", {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  return (
    <div>
      <PhoneBrandForm />
      <ul className="list  rounded-2xl border border-base-300 mt-4">
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
          Brands Available
        </li>

        {brandList.length === 0 && (
          <h1 className="mx-auto py-4 text-gray-400">Not Found</h1>
        )}

        {brandList.map((brand) => (
          <li className="list-row flex items-center" key={brand._id}>
            <img
              className="size-10 rounded-box"
              src={brand.brandLogo}
              alt={brand.brandName}
            />

            <div className=" font-bold text-primary flex-1 px-4">
              <h1 className="text-xl">{brand.brandName}</h1>
            </div>

            <button
              className="btn btn-error text-2xl mr-2"
              onClick={() => deleteHandler(brand._id)}
            >
              <FaRegTrashCan />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PhoneBrandsSetting;
