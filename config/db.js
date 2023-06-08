import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Database connesso...");
  } catch (error) {
    console.log(`Error: ${error.message}`);
      
  }
};

export default connectDB;