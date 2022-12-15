"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"]
    },
    email: {
        type: String,
        required: [true, "Please add email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please add email"]
    }
}, {
    timestamps: true
});
const userModel = (0, mongoose_1.model)("User", userSchema);
exports.default = userModel;
