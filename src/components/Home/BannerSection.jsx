import Link from "next/link";
import bannerIcon from "../../image/icon_banner.svg";
import Image from "next/image";

const BannerSection = () => {
  return (
    <div
      className="relative flex flex-col-reverse lg:flex-row justify-evenly items-center w-full py-8 lg:py-12
    px-6 bg-linear-to-br from-primary-main via-secondary-main to-primary-hover 
    rounded-3xl mt-6    overflow-hidden"
    >
      {/* Background Effects */}

      {/* Image Section */}
      <div className="relative mt-8 lg:mt-0 size-56 lg:size-100 transform">
        <Image
          src={bannerIcon}
          width={1000}
          alt={"icon"}
          className="drop-shadow-2xl"
        />
      </div>

      {/* Content Section */}
      <div className="relative flex flex-col gap-5 lg:gap-7 justify-evenly items-center lg:items-start text-center lg:text-left">
        {/* Main Title */}
        <div className="space-y-4">
          <h1 className="text-8xl md:text-8xl lg:text-10xl italic font-black bg-linear-to-r from-primary-light via-primary-light to-white bg-clip-text text-transparent drop-shadow-lg">
            BFT
          </h1>
          <h2 className="text-3xl md:text-4xl lg:text-5xl italic font-bold text-primary-light ">
            Warm Up Version
          </h2>
        </div>

        {/* Subtitle */}
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-secondary-light">
          Available Now
        </h3>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <Link
            href={"/"}
            className="group relative px-8 py-4 font-bold text-primary-light
            border-2 border-primary-light/80 rounded-xl
            hover:bg-primary-light/10 hover:border-primary-light
             hover:shadow-primary-light/25
            transition-all duration-300 transform hover:-translate-y-1"
          >
            <span className="relative z-10">UPDATE NEWS</span>
          </Link>

          <Link
            href={"/"}
            className="group relative px-8 py-4 font-bold text-text-light
            bg-primary-main rounded-xl  transition-all duration-300 hover:bg-primary-hover transform hover:-translate-y-1 
            border border-primary-light"
          >
            MODELS
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BannerSection;
