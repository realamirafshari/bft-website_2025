import React from "react";

const NotificationHeader = () => {
  return (
    <section className="bg-primary/10  text-center font-bold px-8 py-3 md:py-4 flex justify-center items-center transition-all gap-2 ">
      <span className="relative flex size-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary  opacity-75"></span>
        <span className="relative inline-flex size-3 rounded-full bg-primary"></span>
      </span>{" "}
      <h1 className="">Brutal Forensic Tool is now available!</h1>{" "}
    </section>
  );
};

export default NotificationHeader;
