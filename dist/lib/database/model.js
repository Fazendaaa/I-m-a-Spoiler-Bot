"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema_1 = require("./schema");
exports.news = mongoose_1.model('news', schema_1.newsSchema);
