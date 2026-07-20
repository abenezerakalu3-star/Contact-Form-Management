import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
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
    password: {
      type: String,
      minLength: [6, "Password must be at least 6 characters long"],
      required: true,
    },
  },
  { timestamps: true },
);


const Admin = mongoose.model("Admin", adminSchema);
export default Admin;