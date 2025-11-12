import { model, models, Schema } from "mongoose";

const supportModelsSchema = new Schema(
  {
    brandName: { type: String, required: true },
    modelName: { type: String, required: true },
    modelType: { type: String, required: true },
    chipset: { type: String },
    androidVersion: { type: String },
    image: { type: String },
    featurs: [{ type: String }],
  },
  { timestamps: true }
);

const SupportModels =
  models.SupportModels || model("SupportModels", supportModelsSchema);
export default SupportModels;
 