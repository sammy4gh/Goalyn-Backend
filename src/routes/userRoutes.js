"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const authMiddleWare_1 = require("../middleWare/authMiddleWare");
const router = express_1.default.Router();
router.post("/", userController_1.registerUser);
router.post("/login", userController_1.loginUser);
router.get("/me", authMiddleWare_1.protect, userController_1.getMe);
exports.default = router;
