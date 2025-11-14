import SupportModels from "@/models/SupportModels";
import PhoneModels from "@/template/ModelsPage/PhoneModels";
import { connectDB } from "@/utils/connectDB";

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
