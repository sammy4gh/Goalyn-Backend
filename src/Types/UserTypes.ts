import { InitialStateType } from "./GlobalTypes";

export interface UserType {
  /** name of user*/
  name?: string;
  /** unique email of user*/
  email : string
};

export interface UserSchemaType extends UserType  {
  /** password of user*/
  password: string;
};

export interface AuthState extends InitialStateType  {
  user: UserType | null;
};
