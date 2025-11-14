import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  try {
    await mongoose.connect(process.env.MONGO_URL);
  } catch {
    throw new Error("Can not connect Database");
  }
};

export { connectDB };
