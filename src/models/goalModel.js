"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const goalSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    text: {
        type: String,
        required: [true, "Please add a text value"]
    }
}, { timestamps: true });
const goalModel = (0, mongoose_1.model)("Goal", goalSchema);
exports.default = goalModel;
