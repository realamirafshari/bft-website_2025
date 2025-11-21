import React from "react";
import { FaDownload } from "react-icons/fa6";

const DownloadSoftwarePage = () => {
  return (
    <div className="min-h-screen  flex items-center justify-center">
      <div className="glass rounded-3xl shadow-md p-8 max-w-md w-full border border-base-300  transition-all duration-500">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 border border-base-300 rounded-full flex items-center justify-center mx-auto mb-6  duration-300">
            <FaDownload className="text-4xl text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-secondary mb-3  ">
            BFT Software
          </h1>
          <p className="text-secondary text-lg">Latest Enhanced Version</p>
        </div>

        {/* Version Info */}
        <div className="bg-white/5 rounded-2xl p-6 mb-8 border border-base-300 duration-300">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className=" font-medium">Release Date:</span>
              <span className="">November 20, 2025</span>
            </div>
            <div className="flex justify-between items-center">
              <span className=" font-medium">File Size:</span>
              <span className="">300 MB</span>
            </div>
          </div>
        </div>

        {/* Main Download Button */}
        <a
          href="https://nbppepxnowlvdeb3.public.blob.vercel-storage.com/BFTSetup-R12Final.exe?download=1"
          download
          className="w-full bg-linear-to-r from-primary to-secondary  text-primary-content font-bold py-5 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-md  flex items-center justify-center gap-3 mb-6 group"
        >
          <FaDownload className="text-xl  text-primary-content" />
          Download Latest Version
        </a>

        {/* Features */}
        <div className="grid grid-cols-2 gap-4 ">
          <div className="text-center p-4 border border-base-300 rounded-xl  transition-colors duration-300 group">
            <div className="text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
              <svg
                className="w-7 h-7 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <span className="text-sm text-primary font-medium">
              High Security
            </span>
          </div>
          <div className="text-center p-4 border border-base-300  rounded-xl  transition-colors duration-300 group">
            <div className="text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
              <svg
                className="w-7 h-7 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <span className="text-sm text-primary font-medium">
              Fast Performance
            </span>
          </div>
          <div className="text-center p-4 border border-base-300  rounded-xl  transition-colors duration-300 group">
            <div className="text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
              <svg
                className="w-7 h-7 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <span className="text-sm text-primary font-medium">Encryption</span>
          </div>
          <div className="text-center p-4 border border-base-300  rounded-xl  transition-colors duration-300 group">
            <div className="text-primary mb-2  duration-300">
              <svg
                className="w-7 h-7 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <span className="text-sm text-primary font-medium">
              24/7 Support
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadSoftwarePage;
