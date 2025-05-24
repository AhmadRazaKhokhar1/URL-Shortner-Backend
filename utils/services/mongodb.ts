// Mongoose
import mongoose from "mongoose";

// Dotenv
import { configDotenv } from "dotenv";
configDotenv();

export async function ConnectMongoDB() {
  try {
    const uri = process.env.MONGO_URI;
    await mongoose.connect(uri);
    console.log("DB Connected successfully ✅");
  } catch (error) {
    console.error(
      "An error occured while connecting to the database:❌ ",
      error,
    );
  }
}
