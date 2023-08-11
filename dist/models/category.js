"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categorySchema = void 0;
const mongoose_1 = require("mongoose");
exports.categorySchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    categoryBanner: { type: String, default: null },
    organization: { type: mongoose_1.Schema.Types.ObjectId, ref: "Organization" }
}, { timestamps: true });
const Category = (0, mongoose_1.model)("Category", exports.categorySchema);
exports.default = Category;
//# sourceMappingURL=category.js.map