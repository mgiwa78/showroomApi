"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const category_1 = require("./category");
const CategoryMod = mongoose_1.default.model("Category", category_1.categorySchema);
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    price: { type: String, required: true },
    description: { type: String, required: true },
    profilePicture: { type: String, default: null },
    otherPictures: { type: [String], default: [] },
    category: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "Category",
        required: true
    },
    organization: { type: mongoose_1.Schema.Types.ObjectId, ref: "Organization" }
}, { timestamps: true });
const Product = (0, mongoose_1.model)("Product", productSchema);
exports.default = Product;
//# sourceMappingURL=product.js.map