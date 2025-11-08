import { model, models, Schema } from "mongoose";

const landingBannerSchema = new Schema(
  {
    title: { type: String, required: true },           
    subtitle: { type: String },                       
    description: { type: String },                    
    tags: [{ type: String }],                      
    image: { type: String },                           
  },
  { timestamps: true }
);

const LandingBanner = models.LandingBanner || model("LandingBanner", landingBannerSchema);
export default LandingBanner;


// {
//   title: "Brutal Forensic Tool",
//   subtitle: "Warm-up Version",
//   description: "First public access of BFT is now available.",
//   tags: ["Warm up version", "Available now"],
//   image: "/banner/bft-banner.png",
// }
