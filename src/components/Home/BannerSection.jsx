import Link from "next/link";
import bannerIcon from "../../image/icon_banner.svg";
import Image from "next/image";

const BannerSection = () => {
  return (
    <div
      className="relative flex flex-col-reverse lg:flex-row justify-evenly items-center w-full py-8 lg:py-12
    px-6 bg-gradient-to-br from-primary to-secondary
    rounded-3xl mt-6 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/3 rounded-full blur-3xl"></div>
      </div>

      {/* Image Section */}
      <div className="relative mt-8 lg:mt-0 w-64 lg:w-96 transform animate-float">
        <Image
          src={bannerIcon}
          width={500}
          alt={"icon"}
          className="drop-shadow-2xl"
        />
      </div>

      {/* Content Section */}
      <div className="relative flex flex-col gap-4  justify-evenly items-center lg:items-start text-center lg:text-left">
        {/* Main Title */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl lg:text-7xl italic font-black text-white drop-shadow-lg leading-tight">
            Brutal Forensic Tool
          </h1>
          <h2 className="text-3xl md:text-4xl lg:text-4xl italic text-white font-medium">
            Professional Mobile Forensic Tool
          </h2>
        </div>

        {/* Feature Highlights */}
        <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/30">
            <span className="text-white font-semibold text-sm md:text-base flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Find Second Space User Lock
            </span>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/30">
            <span className="text-white font-semibold text-sm md:text-base flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Fast Password Unlock
            </span>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/30">
            <span className="text-white font-semibold text-sm md:text-base flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Full Encryption Support
            </span>
          </div>
        </div>

        {/* Available Now Section - Optimized */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mt-2 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-4 h-4 bg-green-400 rounded-full animate-ping absolute"></div>
              <div className="w-4 h-4 bg-green-500 rounded-full relative"></div>
            </div>
            <span className="text-white text-2xl font-bold">Available Now</span>
          </div>
          
          <div className="flex items-center gap-4 text-white/90">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">Fast</span>
            </div>
            <div className="w-px h-6 bg-white/30"></div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">Light Weight</span>
            </div>           
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-2">
        

          <Link
            href={"/whats-new"}
            className="btn btn-lg bg-white text-primary hover:bg-gray-100 border-0 font-bold px-8 py-4 rounded-2xl shadow-lg  transition-all duration-300 "
          >
            <span className="flex items-center gap-2">
              UPDATE NEWS
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </Link>

          <Link
            href={"/models"}
            className="btn btn-outline btn-lg border-2 border-white text-white hover:bg-white hover:text-primary font-bold px-8 py-4 rounded-2xl shadow-lg transition-all duration-300 "
          >
            <span className="flex items-center gap-2">
              MODELS
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        </div>

      
      </div>
    </div>
  );
};

export default BannerSection;