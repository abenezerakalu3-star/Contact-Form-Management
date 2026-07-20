import mongoose from "mongoose";

export const ConnectDB = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGO_URI}/contact-form-management` );
    console.log("Database connected successfully: "+ conn.connection.host);
    
  } catch (error) {
    console.log(`Error connecting to database`, error)
    process.exit(1) // exit with failure
  }
};


