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
exports.Delete__CATEGORY__DESTROY = exports.Update__CATEGORY__PUT = exports.Fetch__CATEGORY__GET = exports.Fetch__CATEGORIES__GET = exports.Upload__CATEGORY_IMAGE__POST = exports.Create__CATEGORY__POST = void 0;
const category_1 = __importDefault(require("../models/category"));
// Create a new product
const Create__CATEGORY__POST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const { name, description } = req.body;
        const category = yield category_1.default.create({
            name,
            description,
            organization: user.organization
        });
        res.status(201).json({ status: "success", data: category });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Create__CATEGORY__POST = Create__CATEGORY__POST;
const Upload__CATEGORY_IMAGE__POST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const ID = req.params.categoryID;
    const files = req.files;
    const category = yield category_1.default.findById(ID);
    if (!category) {
        return res
            .status(400)
            .json({ status: "error", message: "Invalid Category ID" });
    }
    if ((_a = files["categoryBanner"]) === null || _a === void 0 ? void 0 : _a[0]) {
        const categoryBannerFile = (_b = files["categoryBanner"]) === null || _b === void 0 ? void 0 : _b[0];
        category.categoryBanner = "categories/" + categoryBannerFile.filename;
    }
    else {
        return res
            .status(400)
            .json({ status: "error", message: "No Image Selected" });
    }
    category.save();
    return res.json({
        message: "Files uploaded successfully!"
    });
});
exports.Upload__CATEGORY_IMAGE__POST = Upload__CATEGORY_IMAGE__POST;
const Fetch__CATEGORIES__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userOrganization = req.user.organization;
        const products = yield category_1.default.find({
            organization: userOrganization
        });
        res.json({ status: "success", data: products });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Fetch__CATEGORIES__GET = Fetch__CATEGORIES__GET;
// Get a single product by ID
const Fetch__CATEGORY__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryId = req.params.categoryId;
        const category = yield category_1.default.findById(categoryId);
        if (!category) {
            return res
                .status(404)
                .json({ status: "error", error: "Category not found" });
        }
        res.json({ status: "success", data: category });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Fetch__CATEGORY__GET = Fetch__CATEGORY__GET;
// Update a product by ID
const Update__CATEGORY__PUT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryId = req.params.categoryId;
        const { name, description, pictures } = req.body;
        const updatedCategory = yield category_1.default.findByIdAndUpdate(categoryId, { name, description, pictures }, { new: true });
        if (!updatedCategory) {
            return res
                .status(404)
                .json({ status: "error", error: "Product not found" });
        }
        res.json({ status: "success", data: updatedCategory });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Update__CATEGORY__PUT = Update__CATEGORY__PUT;
// Delete a product by ID
const Delete__CATEGORY__DESTROY = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryId = req.params.categoryId;
        const deletedCategory = yield category_1.default.findByIdAndDelete(categoryId);
        if (!deletedCategory) {
            return res
                .status(404)
                .json({ status: "error", error: "Product not found" });
        }
        res.json({ status: "success", data: deletedCategory });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Delete__CATEGORY__DESTROY = Delete__CATEGORY__DESTROY;
//# sourceMappingURL=Category-Controller.js.map