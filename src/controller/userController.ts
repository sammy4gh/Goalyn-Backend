import { Request, Response, Handler } from "express";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import expressAsyncHandler from "express-async-handler";
import goalModel from "../models/goalModel";
import userModel from "../models/userModels";
import dotenv from "dotenv";
import mongoose from "mongoose";

const Goal = goalModel;
const User = userModel;
const jwt = jsonwebtoken;

//@desc Register new user
//@route Post /api/user
//@access Public
const registerUser: Handler = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400);

      throw new Error("Please add all fields");
    }
    //Check if user exists
    const userExists = await User.findOne({ email });

    //Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    //Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(200).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw Error("Invalid user data");
    }
  }
);

//@desc Authenticate user
//@route Post /api/user/login
//@access Public
const loginUser: Handler = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    //Check for user email
    const user = await User.findOne({ email });

    //Check credentials
    if (user && (await bcryptjs.compare(password, user.password))) {
      res.status(200).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw Error("Invalid credentials");
    }
  }
);

//@desc Get user data
//@route Post /api/user/me
//@access Public
const getMe: Handler = expressAsyncHandler(
  async (req: Request, res: Response) => {
    // @ts-ignore
    res.json(req.user);
  }
);

//Generate JWT

const generateToken = (id: mongoose.Types.ObjectId) => {
  const secrete = process.env.JWT_SECRETE || "";
  return jwt.sign({ id }, secrete, {
    expiresIn: "30d",
  });
};

export { registerUser, loginUser, getMe };
