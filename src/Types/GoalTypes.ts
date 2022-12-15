import { Schema } from "mongoose";
import { InitialStateType } from "./GlobalTypes";


export interface TagType {
  text : string
}
export interface GoalDataType  {
  text?: string
  tags : Schema.Types.Array
}

export interface GoalType extends GoalDataType {
  _id : string;
  user?: object | Schema.Types.ObjectId;
  createdAt: string
};



export type GoalStateType = InitialStateType & {
  goals: GoalType[] | never 
};
