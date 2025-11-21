import { model, models, Schema } from "mongoose";

const userSchema = new Schema(
  {
    userID: { type: String, required: true, unique: true },
    email: { type: String },
    fullName: { type: String },
    password: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    isVerified: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const User = models.User || model("User", userSchema);
export default User;
