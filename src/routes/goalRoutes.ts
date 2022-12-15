import express, { Router } from "express";
import {
  deleteGoal,
  getGoal,
  setGoal,
  updateGoal,
} from "../controller/goalController";
import {protect} from "../middleWare/authMiddleWare";

const router: Router = express.Router();
router.route("/").get(protect,getGoal).post(protect,setGoal);
router.route("/:id").delete(protect,deleteGoal).put(protect,updateGoal);

export default router;
