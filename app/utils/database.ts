import mongoose from "mongoose";

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const connectURL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@db1.pzfudpy.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=DB1`;

const connectDB = async() => {
  try {
    await mongoose.connect(connectURL);
    console.log("Success: Connected to MongoDB");
  } catch(err) {
    console.log("Failure: Unconnected to MongoDB");
    throw new Error();
  }
}

export default connectDB;