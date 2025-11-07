import Link from "next/link";

const ContentSection = () => {
  return (
    <div className=" flex gap-2 flex-col justify-center items-center mt-6 bg-amber-300">
      <h1 className="text-7xl font-bold text-primary-main md:text-9xl bg-red-50">
        BFT
      </h1>
      <h3 className="text-[20px] text-secondary-main md:text-4xl">
        Professional Mobile Forensic Tool{" "}
      </h3>
      <div className="flex gap-4 mt-2">
        <Link
          href={"/"}
          className="btn btn-outline border border-secondary-main text-secondary-main"
        >
          UPDATE NEWS
        </Link>
        <Link
          href={"/"}
          className="btn bg-primary-main border-none text-primary-light"
        >
          MODELS
        </Link>
      </div>
    </div>
  );
};

export default ContentSection;
