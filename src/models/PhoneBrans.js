import { model, models, Schema } from "mongoose";

const phoneBrandSchema = new Schema(
  {
    brandName: String,
    brandLogo: String,
  },
  { timestamps: true }
);

const PhoneBrand = models.PhoneBrand || model("PhoneBrand", phoneBrandSchema);
export default PhoneBrand;
