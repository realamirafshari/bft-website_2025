import BannerSection from "@/components/Home/BannerSection";
import ContentSection from "@/components/Home/ContentSection";
import NotificationHeader from "@/components/Home/NotificationHeader";
import PhoneBrandSection from "@/components/Home/PhoneBrandSection";
import React from "react";

const HomePage = () => {
  return (
    <main className="container mx-auto px-6 ">
     
      <ContentSection />
      <BannerSection/>
      <PhoneBrandSection/>
    </main>
  );
};

export default HomePage;
