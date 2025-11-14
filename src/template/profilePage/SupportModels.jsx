import SupportModelsForm from "@/components/profilePage/SupportModelsForm";
import PhoneBrand from "@/models/PhoneBrands";
import SupportModels from "@/models/SupportModels";
import { connectDB } from "@/utils/connectDB";

import SupportModelsList from "./SupportModelsList";

const SupportModelsPage = async () => {
  await connectDB();
  const brand = await PhoneBrand.find({}).lean();
  const Models = await SupportModels.find({}).lean();
  const plainBrand = JSON.parse(JSON.stringify(brand));
  const plainModels = JSON.parse(JSON.stringify(Models));
  return (
    <div>
      <SupportModelsForm brand={plainBrand} />
      <SupportModelsList modelList={plainModels} />
    </div>
  );
};

export default SupportModelsPage;
