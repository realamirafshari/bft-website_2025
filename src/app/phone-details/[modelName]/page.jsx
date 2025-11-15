"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosPhonePortrait } from "react-icons/io";

const PhoneDetailsPage = () => {
  const { modelName } = useParams();
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhoneData = async () => {
      try {
        const res = await fetch("/api/profile/support-models");
        const data = await res.json();

        const decodedName = decodeURIComponent(modelName);
        const phone = data.find((item) => item.modelName === decodedName);

        setModel(phone || null);
      } catch (error) {
        console.error("Error fetching phone details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhoneData();
  }, [modelName]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="loading loading-dots loading-xl"></span>{" "}
          <p className="mt-4 text-gray-600">Loading phone details...</p>
        </div>
      </div>
    );
  }

  if (!model) {
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <div className="text-center">
          <div className="text-6xl mb-4">📱</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Phone Not Found
          </h1>
          <p className="text-gray-600">
            Unfortunately, no information was found for this model.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-linear-to-r from-primary to-secondary p-6 text-white">
            <div className="flex justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-1">
                  {model.modelName}
                </h1>
                <p className=" text-lg">{model.brandName}</p>
              </div>

              <span className="badge badge-ghost mt-4 md:mt-0   px-4 py-2 rounded-xl ">
                {model.modelType}
              </span>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row">
            {/* Image */}
            <div className="lg:w-2/5 p-6  flex items-center justify-center">
              {model.image && model.image.startsWith("http") ? (
                <Image
                  src={model.image}
                  alt={model.modelName}
                  className="w-72 h-72 object-contain transform rounded-2xl transition-transform duration-300 bg-base-300 p-8"
                  width={220}
                  height={220}
                />
              ) : (
                <div className="flex flex-col items-center">
                  <IoIosPhonePortrait className="w-16 h-16 md:w-20 md:h-20 text-primary mb-2" />
                  <span className="text-primary  ">Image not available</span>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="lg:w-3/5 p-6">
              {/* Specifications */}
              <div className="mb-8">
                <h2 className="text-xl font-bold  mb-4 border-b pb-2">
                  Specifications
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-info/10 rounded-lg p-4 border-r-4 border-info">
                    <div className="flex justify-between items-center">
                      <span className="text-info font-medium">
                        Android Version
                      </span>
                      <span className="badge badge-info font-semibold ">
                        {model.androidVersion}
                      </span>
                    </div>
                  </div>

                  <div className="bg-success/10 rounded-lg p-4 border-r-4 border-success">
                    <div className="flex justify-between items-center">
                      <span className=" text-success font-medium">Chipset</span>
                      <span className="badge badge-success font-semibold">
                        {model.chipset}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div>
                <h2 className="text-xl font-bold  mb-4 border-b pb-2">
                  Key Features
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {model.featurs?.map((feature, index) => (
                    <div
                      key={index}
                      className="flex gap-4 items-center  rounded-lg p-3 hover:bg-base-200 border border-base-300 transition-colors"
                    >
                      <div className="w-2 h-2 bg-primary rounded-full ml-3"></div>
                      <span className="">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneDetailsPage;
