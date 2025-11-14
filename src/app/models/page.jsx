import SupportModels from "@/models/SupportModels";
import PhoneModelPage from "@/template/ModelsPage/PhoneModelPage";
import { connectDB } from "@/utils/connectDB";
import React from "react";
import { IoSearchOutline } from "react-icons/io5";

const page = async () => {
    await connectDB();
  const phoneModels = await SupportModels.find({});
  const plainPhoneModels = JSON.parse(JSON.stringify(phoneModels));
  return (
    <div className="p-4 md:p-8 transition-all ">
      <PhoneModelPage phoneModels={plainPhoneModels}/>
      
    </div>
  );
};

export default page;
