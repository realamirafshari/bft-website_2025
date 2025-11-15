import SupportModelWrapper from "./SupportModelWrapper";
import PhoneBrand from "@/models/PhoneBrands";
import SupportModels from "@/models/SupportModels";
import { connectDB } from "@/utils/connectDB";

const SupportModelsPage = async () => {
  await connectDB();

  const brands = await PhoneBrand.find({}).lean();
  const models = await SupportModels.find({}).lean();

  const plainBrands = JSON.parse(JSON.stringify(brands));
  const plainModels = JSON.parse(JSON.stringify(models));

  return (
    <div className="p-8">
      <SupportModelWrapper initialBrands={plainBrands} initialModels={plainModels} />
    </div>
  );
};

export default SupportModelsPage;
