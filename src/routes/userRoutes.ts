import express, { Router } from "express";
import {getMe, loginUser, registerUser} from "../controller/userController";
import {protect} from "../middleWare/authMiddleWare";

const router: Router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect,getMe);

export default router;
