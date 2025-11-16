import PhoneModelPage from "@/template/ModelsPage/PhoneModelPage";
import { metadataConfig } from "@/utils/metadataConfig";

export const metadata = metadataConfig.models

const page = async () => {

  return (
    <div className="p-4 md:p-8 transition-all ">
      <PhoneModelPage />

    </div>
  );
};

export default page;
