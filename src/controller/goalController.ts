import { Handler, Request, Response } from "express";
import goalModel from "../models/goalModel";
import expressAsyncHandler from "express-async-handler";
import userModel from "../models/userModels";
import {GoalDataType, GoalType} from "../Types/GoalTypes";
import {UserType} from "../Types/UserTypes";
import {log} from "util";

const Goal  = goalModel ;
const User = userModel;
//@desc Get goals
//@route GET /api/goals
//@access Private
const getGoal: Handler = expressAsyncHandler(
  async (req: Request, res: Response) => {

    // @ts-ignore
    const { id  } = req.user;
    const goals : GoalType[] = await Goal.find({ user: id }) || {} as GoalType[];
    res.status(200).json(goals);
  }
);

//@desc Set goals
//@route POST /api/goals
//@access  Private
const setGoal: Handler = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { text, tags } : GoalDataType = req.body;

    // @ts-ignore
      const { id } = req.user;
    if (!text || !tags) {
      res.status(400);
      throw new Error("Please add a text field and tags");
    }


    const goal :GoalDataType = await Goal.create({
      text: text,
      user: id,
        tags : tags
    });
    res.status(200).json(goal);
  }
);

//@desc Update goals
//@route PUT /api/goals:id
//@access  Private
const updateGoal: Handler = expressAsyncHandler(
  async (req: Request  , res: Response) => {
    const goal : GoalType = await Goal.findById(req.params.id) || {} as GoalType;

    if (!goal) {
      res.status(400);
      throw new Error("Goal not found");
    }

    //Check for user
    // @ts-ignore
    if (!req.user) {
      res.status(401);
      throw new Error("User not found");
    }

    //Make sure logged-in user matches the goal user
    // @ts-ignore
    if (goal.user?.toString() !== req.user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }
    const updatedGoal : GoalType = await Goal.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })  || {} as GoalType;

    res.status(200).json(updatedGoal);
  }
);

//@desc Delete goals
//@route DELETE /api/goals:id
//@access  Private
const deleteGoal: Handler = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const goal = await Goal.findById(id);

    if (!goal) {
      res.status(400);
      throw new Error("Goal not found");
    }

    //Check for user
    // @ts-ignore
    if (!req.user) {
      res.status(401);
      throw new Error("User not found");
    }

    //Make sure logged-in user matches the goal user
    // @ts-ignore
    if (goal.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }

    await goal.remove();
    res.status(200).json({ id: id });
  }
);

export { getGoal, setGoal, updateGoal, deleteGoal };
