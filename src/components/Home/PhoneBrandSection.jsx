import Image from "next/image";
// import samsung from "../../image/samsung.svg";
import xiaomi from "../../image/xiaomi.svg";
// import huawei from "../../image/huawei.svg";
import Link from "next/link";
import SectionTitle from "./SectionTitle";

const PhoneBrandSection = () => {
  const modelName = "xiaomi"
  return (
    <div className="relative pt-12 ">
      <SectionTitle titleText={"Supported Brands"} />

      <div className=" mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8  items-center max-w-4xl mt-12">
        <Link
          href={`/model/${modelName}`}
          className="group bg-white rounded-2xl p-8  transition-all   border border-border"
        >
          <div className="">
            <Image
              src={xiaomi}
              width={180}
              height={60}
              alt="Huawei logo"
              className="mx-auto transition-all duration-300 group-hover:scale-110"
            />
            <div className="mt-4 text-center">
              <span className=" text-text font-medium group-hover:text-secondary-main transition-colors duration-300">
                {modelName} Devices
              </span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PhoneBrandSection;
