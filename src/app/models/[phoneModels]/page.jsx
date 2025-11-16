import SupportModels from "@/models/SupportModels";
import PhoneModels from "@/template/ModelsPage/PhoneModels";
import { connectDB } from "@/utils/connectDB";
import { metadataConfig } from "@/utils/metadataConfig";

export async function generateMetadata({ params }) {
  const { phoneModels } = await params;
  return metadataConfig["models/[id]"](phoneModels);
}

const page = async () => {
  await connectDB();
  const phoneModels = await SupportModels.find({});
  const plainPhoneModels = JSON.parse(JSON.stringify(phoneModels));

  return (
    <div>
      <PhoneModels phoneModels={plainPhoneModels} />
    </div>
  );
};

export default page;
