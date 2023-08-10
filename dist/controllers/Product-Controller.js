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
exports.Delete__PRODUCT__DESTROY = exports.Update__PRODUCT__PUT = exports.Fetch__PRODUCT__GET = exports.Fetch__PRODUCTS__GET = exports.Upload__PRODUCT_IMAGE__POST = exports.Create__PRODUCT__POST = void 0;
const product_1 = __importDefault(require("../models/product"));
const models_1 = require("../models");
// Create a new product
const Create__PRODUCT__POST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const { name, description, category, price } = req.body;
        const organization = yield models_1.Organization.findById(user.organization);
        const product = yield product_1.default.create({
            name,
            description,
            category,
            organization,
            price
        });
        res.status(201).json({ status: "success", data: product });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Create__PRODUCT__POST = Create__PRODUCT__POST;
const Upload__PRODUCT_IMAGE__POST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const ID = req.params.productID;
    const files = req.files;
    const product = yield product_1.default.findById(ID);
    if (!product) {
        return res
            .status(400)
            .json({ statuproducts: "error", message: "Invalid Product ID" });
    }
    if ((_a = files["profilePicture"]) === null || _a === void 0 ? void 0 : _a[0]) {
        const profilePictureFile = (_b = files["profilePicture"]) === null || _b === void 0 ? void 0 : _b[0];
        product.profilePicture = "products/" + profilePictureFile.filename;
    }
    if (files["otherPictures"]) {
        const otherPicturesFiles = files["otherPictures"];
        otherPicturesFiles.forEach((e) => product.otherPictures.push(e.filename));
    }
    else {
        return res
            .status(400)
            .json({ statuproducts: "error", message: "No Image Selected" });
    }
    product.save();
    return res.json({
        message: "Files uploaded successfully!"
    });
});
exports.Upload__PRODUCT_IMAGE__POST = Upload__PRODUCT_IMAGE__POST;
const Fetch__PRODUCTS__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_1.default.find()
            .populate("category")
            .exec();
        res.json({ status: "success", data: products });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Fetch__PRODUCTS__GET = Fetch__PRODUCTS__GET;
// Get a single product by ID
const Fetch__PRODUCT__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const product = yield product_1.default.findById(productId);
        if (!product) {
            return res
                .status(404)
                .json({ status: "error", error: "Product not found" });
        }
        res.json({ status: "success", data: product });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Fetch__PRODUCT__GET = Fetch__PRODUCT__GET;
// Update a product by ID
const Update__PRODUCT__PUT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const { name, description, pictures } = req.body;
        const updatedProduct = yield product_1.default.findByIdAndUpdate(productId, { name, description, pictures }, { new: true });
        if (!updatedProduct) {
            return res
                .status(404)
                .json({ status: "error", error: "Product not found" });
        }
        res.json({ status: "success", data: updatedProduct });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Update__PRODUCT__PUT = Update__PRODUCT__PUT;
// Delete a product by ID
const Delete__PRODUCT__DESTROY = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const deletedProduct = yield product_1.default.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res
                .status(404)
                .json({ status: "error", error: "Product not found" });
        }
        res.json({ status: "success", data: deletedProduct });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Delete__PRODUCT__DESTROY = Delete__PRODUCT__DESTROY;
//# sourceMappingURL=Product-Controller.js.map