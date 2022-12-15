import mongoose, { Schema, model } from "mongoose";
import { GoalType , TagType} from "../Types/GoalTypes";

const goalSchema = new Schema<GoalType>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    text: {
      type: String,
      required: [true, "Please add a text value"]
    },
    tags : {
        type : Schema.Types.Array,
        required : [true, 'Please add a tag']
    }
  },

  { timestamps: true }
);

const goalModel = model<GoalType>("Goal", goalSchema);

export default goalModel;
