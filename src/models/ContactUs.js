import { Schema, model, models } from "mongoose";

const contactUsSchema = new Schema(
  {
    email: { type: String, required: true, trim: true },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const ContactUs = models.ContactUs || model("ContactUs", contactUsSchema);

export default ContactUs;
