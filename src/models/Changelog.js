import { model, models, Schema } from "mongoose";

const changelogSchema = new Schema(
  {
    version: { type: String, required: true },
    title: { type: String }, 
    releaseDate: { type: Date, default: Date.now }, 
    features: [{ type: String }], 
    supportDevice: [{ type: String }],
  },
  { timestamps: true }
);

const Changelog = models.Changelog || model("Changelog", changelogSchema);
export default Changelog;

// {
//   version: "1.0.2",
//   title: "Warm-up version major improvements",
//   releaseDate: "2025-01-01",
//   features: [
//     "Added FRP for Xiaomi MTK",
//     "Improved UnlockScreen stability",
//     "Added support for Android 13 Decrypt"
//   ],
//   supportDevice: [
//     "Redmi Note 9",
//     "Xiaomi Poco X3",
//     "Redmi 12C"
//   ]
// }
