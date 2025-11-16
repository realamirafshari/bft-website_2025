import { model, models, Schema } from "mongoose";

const AuthorizedResellers = new Schema(
  {
    fullName: { type: String, require: true },
    country: { type: String },
    city: { type: String },
    socialLink: [{ type: String }],
    email: { type: String },
    status: { type: String, enum: ["active", "unactive"], default: "active" },
  },
  { timestamps: true }
);
const Resellers =
  models.AuthorizedResellers ||
  model("AuthorizedResellers", AuthorizedResellers);
export default Resellers;
