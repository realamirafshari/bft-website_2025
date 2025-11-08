import { model, models, Schema } from "mongoose";

const userSchema = new Schema(
  {
    fullName: String,
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

const User = models.User || model("User", userSchema);
export default User;
