import Image from "next/image";
// import samsung from "../../image/samsung.svg";
import xiaomi from "../../image/xiaomi.svg";
// import huawei from "../../image/huawei.svg";
import Link from "next/link";

const PhoneBrandSection = () => {
  return (
    <div className="relative py-12">
      {/* Divider */}
      <div className="relative flex items-center justify-center mb-12">
        <div className="flex items-center justify-center gap-4 w-full max-w-2xl mx-auto px-4">
          <div className="h-px bg-linear-to-r from-transparent via-secondary-main to-transparent flex-1"></div>
          <h2 className="text-2xl md:text-3xl font-bold text-secondary-main bg-white   ">
            All Brands
          </h2>
          <div className="h-px bg-linear-to-r from-transparent via-secondary-main to-transparent flex-1"></div>
        </div>
      </div>

      {/* Brands Grid */}
      <div className="relative container mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 px-4 items-center max-w-4xl">
        {/* Huawei */}
        <Link
          href="/huawei"
          className="group relative bg-white rounded-2xl p-8  transition-all duration-500 transform  border border-border"
        >
          <div className="relative z-10">
            <Image
              src={xiaomi || undefined}
              width={180}
              height={60}
              alt="Huawei logo"
              className="mx-auto transition-all duration-500 group-hover:scale-110"
            />
            <div className="mt-4 text-center">
              <span className=" text-text font-medium group-hover:text-secondary-main transition-colors duration-300">
                Huawei Devices
              </span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PhoneBrandSection;
