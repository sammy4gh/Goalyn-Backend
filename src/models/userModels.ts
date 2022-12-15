import mongoose, { Schema, model } from "mongoose";
import { UserSchemaType } from "../Types/UserTypes";

const userSchema = new Schema<UserSchemaType>(
  {
    name: {
      type: String,
      required: [true, "Please add a name"]
    },
    email: {
      type: String,
      required: [true, "Please add email"],
      unique: true
    },
    password: {
      type: String,
      required: [true, "Please add email"]
    }
  },
  {
    timestamps: true
  }
);
const userModel = model<UserSchemaType>("User", userSchema) ;

export default userModel;
