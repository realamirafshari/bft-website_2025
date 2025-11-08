import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connect => hello");
  } catch {
    console.log("Error Connect DataBase");
  }
};

export { connectDB };
