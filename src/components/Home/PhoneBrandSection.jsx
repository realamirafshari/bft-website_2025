import Image from "next/image";
// import samsung from "../../image/samsung.svg";
import xiaomi from "../../image/xiaomi.svg";
// import huawei from "../../image/huawei.svg";
import Link from "next/link";
import SectionTitle from "./SectionTitle";

const PhoneBrandSection = () => {
  const modelName = "xiaomi";
  return (
    <div className=" pt-12 ">
      <SectionTitle titleText={"Supported Brands"} />

      <div className=" mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8  items-center max-w-4xl mt-12">
        <Link
          href={`/model/${modelName}`}
          className="group  rounded-2xl p-8  transition-all   border border-primary hover:scale-110  duration-500"
        >
          <div className="">
            <Image
              src={xiaomi}
              width={180}
              height={60}
              alt="xiaomi logo"
              className="mx-auto invert-0"
            />
            <div className="mt-4 text-center">
              <span className=" text-text font-medium group-hover:text-primary">
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
