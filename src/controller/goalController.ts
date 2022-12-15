import { Handler, Request, Response } from "express";
import goalModel from "../models/goalModel";
import expressAsyncHandler from "express-async-handler";
import userModel from "../models/userModels";

const Goal = goalModel;
const User = userModel;
//@desc Get goals
//@route GET /api/goals
//@access Private
const getGoal: Handler = expressAsyncHandler(
  async (req: Request, res: Response) => {

    // @ts-ignore
    const { id  } = req.user;
    const goals = await Goal.find({ user: id });
    res.status(200).json(goals);
  }
);

//@desc Set goals
//@route POST /api/goals
//@access  Private
const setGoal: Handler = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { text, tags } = req.body;
    // @ts-ignore
    const { id } = req.user;
    if (!text) {
      res.status(400);
      throw new Error("Please add a text field");
    }


    const goal = await Goal.create({
      text: text,
      user: id
    });
    res.status(200).json(goal);
  }
);

//@desc Update goals
//@route PUT /api/goals:id
//@access  Private
const updateGoal: Handler = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const goal = await Goal.findById(req.params.id);

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
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

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
