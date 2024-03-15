import mongoose from "mongoose";

async function connectDb() {
  if (mongoose.connections && mongoose.connections[0].readyState) {
    return true;
  }

  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/geminiwear-database`);
    console.log("MongoDB Connected");
    mongoose.set("debug", true);
    mongoose.set("autoIndex", true);
    
  } catch (error) {
    console.log("MongoDB Connection Error", error);
  }

  return true;
}

export default connectDb;
