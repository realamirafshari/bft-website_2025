import bannerIcon from "../../image/icon_banner.svg";
import Image from "next/image";

const BannerSection = () => {
  return (
    <div className="flex flex-col-reverse lg:flex-row justify-between lg:justify-evenly items-center p-8 w-full bg-secondary-light rounded-2xl mt-8">
      <div className="mt-6">
        <Image src={bannerIcon} width={320} alt={"icon"} />
      </div>
      <div className="flex flex-col gap-4 lg:gap-6 justify-center items-center lg:items-start">
        <h1 className="text-[42px] lg:text-6xl italic font-extrabold text-secondary-main">Warm Up Version</h1>
        <h1 className="text-4xl lg:text-5xl  text-secondary-main">Available Now</h1>
      </div>
    </div>
  );
};

export default BannerSection;
