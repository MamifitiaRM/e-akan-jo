import mongoose from "mongoose";

let isConnected = false;

const connectDb = async () => {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connecter au DB avec success !");

  isConnected = true;
};
export default connectDb;
