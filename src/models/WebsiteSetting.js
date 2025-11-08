import { Schema, model, models } from "mongoose";

const websiteSettingSchema = new Schema(
  {
    siteName: { type: String, default: "Brutal Forensic Tool" },
    siteDescription: {
      type: String,
      default:
        "Professional forensic tools for modern device analysis and recovery.",
    },
    logo: { type: String, default: "" },
    contactEmail: { type: String, default: "" },

    notifications: {
      message: { type: String },
    },

    maintenanceMode: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const WebsiteSetting =
  models.WebsiteSetting || model("WebsiteSetting", websiteSettingSchema);

export default WebsiteSetting;
