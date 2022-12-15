"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGoal = exports.updateGoal = exports.setGoal = exports.getGoal = void 0;
const goalModel_1 = __importDefault(require("../models/goalModel"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userModels_1 = __importDefault(require("../models/userModels"));
const Goal = goalModel_1.default;
const User = userModels_1.default;
//@desc Get goals
//@route GET /api/goals
//@access Private
const getGoal = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const goals = yield Goal.find({ user: req.user.id });
    res.status(200).json(goals);
}));
exports.getGoal = getGoal;
//@desc Set goals
//@route POST /api/goals
//@access  Private
const setGoal = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.text) {
        res.status(400);
        throw new Error("Please add a text field");
    }
    const goal = yield Goal.create({
        text: req.body.text,
        // @ts-ignore
        user: req.user.id
    });
    res.status(200).json(goal);
}));
exports.setGoal = setGoal;
//@desc Update goals
//@route PUT /api/goals:id
//@access  Private
const updateGoal = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const goal = yield Goal.findById(req.params.id);
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
    if (((_a = goal.user) === null || _a === void 0 ? void 0 : _a.toString()) !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }
    const updatedGoal = yield Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });
    res.status(200).json(updatedGoal);
}));
exports.updateGoal = updateGoal;
//@desc Delete goals
//@route DELETE /api/goals:id
//@access  Private
const deleteGoal = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const goal = yield Goal.findById(req.params.id);
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
    yield goal.remove();
    res.status(200).json({ id: req.params.id });
}));
exports.deleteGoal = deleteGoal;
