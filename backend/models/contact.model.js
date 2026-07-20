import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: [3, "Name must be at least 3 characters long"],
      required: true,
    },
    email: {
      type: String,
      match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      required: true,
    },
    phone: {
      type: String,
      minLength: [10, "Phone must be at least 10 characters long"],
      required: true,
    },
    subject: { type: String, required: true },
    message: {
      type: String,
      minLength: [10, "Message must be at least 10 characters long"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Read", "Replied", "Closed"],
      default: "pending",
    },
  },
  { timestamps: true },
);


const Contact = mongoose.model("Contact", contactSchema);
export default Contact;