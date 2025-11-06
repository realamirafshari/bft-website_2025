import Link from "next/link";

const ContentSection = () => {
  return (
    <div className=" flex gap-4 flex-col justify-center items-center mt-6">
      <h1 className="text-4xl font-bold text-primary-main md:text-7xl">
        Brutal Forensic Tool
      </h1>
      <h3 className="text-xl text-secondary-main md:text-4xl">
        Professional Mobile Forensic Tool{" "}
      </h3>
      <div className="flex gap-4 mt-2">
        <Link
          href={"/"}
          className="btn btn-outline border border-secondary-main text-secondary-main"
        >
          FEATURES
        </Link>
        <Link
          href={"/"}
          className="btn bg-primary-main border-none text-primary-light"
        >
          SUPPORTED MODELS
        </Link>
      </div>
    </div>
  );
};

export default ContentSection;
