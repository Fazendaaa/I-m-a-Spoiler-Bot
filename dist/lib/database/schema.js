"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.newsSchema = new mongoose_1.Schema({
    _id: Number,
    date: Number,
    message: String
});
