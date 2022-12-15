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
exports.getMe = exports.loginUser = exports.registerUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const goalModel_1 = __importDefault(require("../models/goalModel"));
const userModels_1 = __importDefault(require("../models/userModels"));
const Goal = goalModel_1.default;
const User = userModels_1.default;
const jwt = jsonwebtoken_1.default;
//@desc Register new user
//@route Post /api/user
//@access Public
const registerUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please add all fields");
    }
    //Check if user exists
    const userExists = yield User.findOne({ email });
    //Hash password
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
    //Create user
    const user = yield User.create({
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
    }
    else {
        res.status(400);
        throw Error("Invalid user data");
    }
}));
exports.registerUser = registerUser;
//@desc Authenticate user
//@route Post /api/user/login
//@access Public
const loginUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    //Check for user email
    const user = yield User.findOne({ email });
    //Check credentials
    if (user && (yield bcryptjs_1.default.compare(password, user.password))) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    }
    else {
        res.status(400);
        throw Error("Invalid credentials");
    }
}));
exports.loginUser = loginUser;
//@desc Get user data
//@route Post /api/user/me
//@access Public
const getMe = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    res.json(req.user);
}));
exports.getMe = getMe;
//Generate JWT
const generateToken = (id) => {
    const secrete = process.env.JWT_SECRETE || "";
    return jwt.sign({ id }, secrete, {
        expiresIn: "30d",
    });
};
