"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const goalController_1 = require("../controller/goalController");
const authMiddleWare_1 = require("../middleWare/authMiddleWare");
const router = express_1.default.Router();
router.route("/").get(authMiddleWare_1.protect, goalController_1.getGoal).post(authMiddleWare_1.protect, goalController_1.setGoal);
router.route("/:id").delete(authMiddleWare_1.protect, goalController_1.deleteGoal).put(authMiddleWare_1.protect, goalController_1.updateGoal);
exports.default = router;
