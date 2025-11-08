import BannerSection from "@/components/Home/BannerSection";
import FeathursSection from "@/components/Home/FeathursSection";
import PhoneBrandSection from "@/components/Home/PhoneBrandSection";
import React from "react";

const HomePage =async () => {
  return (
    <main className="container mx-auto px-4 ">
      {/* <ContentSection /> */}
      <BannerSection />
      <PhoneBrandSection />
      <FeathursSection />
    </main>
  );
};

export default HomePage;
