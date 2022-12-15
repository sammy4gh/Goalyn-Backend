import { connect } from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connectDB: () => Promise<any> = async () => {
  try {
    const uri: string = `${process.env.MONGO_URI}`;
    const conn = await connect(uri);

    return conn.connection.host;
  } catch (e) {
    console.log("Connection error : ", e);
    process.exit(1);
  }
};

export default connectDB;
