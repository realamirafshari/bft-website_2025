import React from "react";

const SectionTitle = ({ titleText }) => {
  return (
    <div className=" flex items-center justify-center ">
      <div className="flex items-center justify-center gap-4 w-full ">
        <div className="h-px bg-linear-to-r from-transparent via-primary to-transparent flex-1"></div>
        <h2 className="text-2xl md:text-3xl font-bold text-primary   ">
          {titleText}
        </h2>
        <div className="h-px bg-linear-to-r from-transparent via-primary to-transparent flex-1"></div>
      </div>
    </div>
  );
};

export default SectionTitle;
