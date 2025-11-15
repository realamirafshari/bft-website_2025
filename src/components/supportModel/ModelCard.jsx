import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoIosPhonePortrait } from "react-icons/io";

const ModelCard = ({ item }) => {
  return (
    <div
      className="  rounded-2xl p-4 md:p-6 border border-base-300 flex flex-col transform hover:-translate-y-1 transition-all"
    >
      {/* Image Container */}
      <div className="w-full h-40 md:h-48 flex items-center justify-center bg-linear-to-br from-base-200 to-base-300 rounded-xl mb-4 md:mb-5 overflow-hidden p-3 border border-base-300">
        {item.image && item.image.startsWith("http") ? (
          <Image
            src={item.image}
            width={500}
            height={500}
            alt={item.modelName}
            className="object-contain w-full h-full "
          />
        ) : (
          <div className="flex flex-col items-center">
            <IoIosPhonePortrait className="w-16 h-16 md:w-20 md:h-20 text-primary mb-2" />
            <span className="text-primary  ">
              Image not available
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1">
        <h2 className=" text-primary md:text-xl font-bold  text-center mb-3 md:mb-4 line-clamp-1">
          {item.brandName} {item.modelName}
        </h2>

        <div className="space-y-2 md:space-y-3">
          {/* Model Type */}
          <div className="flex justify-between items-center py-2 border-b border-base-300">
            <span className="text-primary text-xs md:text-sm flex items-center">
            
              Model Type:
            </span>
            <span className="font-medium text-primary bg-primary/20 px-2 py-1 rounded-md text-xs md:text-sm">
              {item.modelType}
            </span>
          </div>

          {/* Android Version */}
          <div className="flex justify-between items-center py-2 border-b border-base-300">
            <span className="text-secondary text-xs md:text-sm flex items-center">
              
              Android:
            </span>
            <span className="font-medium text-secondary bg-secondary/20 px-2 py-1 rounded-md text-xs md:text-sm">
              {item.androidVersion}
            </span>
          </div>

          
         
        </div>
      </div>

      {/* Button */}
      <Link href={`/phone-details/${item.modelName}`} className="mt-4 md:mt-6 w-full bg-primary text-white py-2.5 md:py-3 rounded-xl hover:bg-secondary hover:cursor-pointer duration-300 font-medium shadow-md hover:shadow-lg transition-all flex items-center justify-center text-sm md:text-base">
        <span>View Details</span>
        
      </Link>
    </div>
  );
};

export default ModelCard;
