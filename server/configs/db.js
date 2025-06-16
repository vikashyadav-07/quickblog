import mongoose from "mongoose";


 const connectDB = async () => {
  try {
    mongoose.connection.on("connected",()=>{
      console.log("MongoDB connected successfully");
    });
    await mongoose.connect(`${process.env.MONGODB_URI}/quickblog`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}
export default connectDB;