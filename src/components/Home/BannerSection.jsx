import Link from "next/link";
import bannerIcon from "../../image/icon_banner.svg";
import Image from "next/image";

const BannerSection = () => {
  return (
    <div
      className=" flex flex-col-reverse lg:flex-row justify-evenly items-center w-full py-8 lg:py-12
    px-6 bg-linear-to-br from-primary to-secondary
    rounded-3xl mt-6    overflow-hidden"
    >
      {/* Background Effects */}

      {/* Image Section */}
      <div className=" mt-8 lg:mt-0 w-64 lg:w-96 transform ">
        <Image
          src={bannerIcon}
          width={500}
          alt={"icon"}
          className="drop-shadow-2xl"
        />
      </div>

      {/* Content Section */}
      <div className=" flex flex-col gap-5 lg:gap-7 justify-evenly items-center lg:items-start text-center lg:text-left">
        {/* Main Title */}
        <div className="space-y-6">
          <h1 className="text-6xl md:text-5xl lg:text-7xl italic font-black text-white drop-shadow-lg">
            Brutal Forensic Tool
          </h1>
          <h2 className="text-4xl md:text-3xl lg:text-4xl italic text-white ">
            Professional Mobile Forensic Tool
          </h2>
        </div>

        {/* Subtitle */}
        <h3 className="text-4xl  font-semibold text-white">
          Available Now
        </h3>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <Link
            href={"/whats-new"}
            className="btn btn-lg "
          >
            <span className="">UPDATE NEWS</span>
          </Link>

          <Link
            href={"/models"}
            className="btn btn-outline btn-lg"
          >
            MODELS
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BannerSection;
