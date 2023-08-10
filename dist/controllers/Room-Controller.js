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
exports.Delete__ROOM__DESTROY = exports.Update__ROOM__PUT = exports.Fetch__ROOM__GET = exports.Fetch__CATEGORIES_PRODUCTS_FOR_CLIENT__GET = exports.Fetch__ROOMS_FOR_CLIENT__GET = exports.Fetch__ROOM_FOR_CLIENT__GET = exports.Fetch__ROOMS__GET = exports.Upload__ROOM_IMAGE__POST = exports.Create__ROOM__POST = void 0;
const room_1 = __importDefault(require("../models/room"));
const models_1 = require("../../src/models");
const category_1 = __importDefault(require("../../src/models/category"));
const product_1 = __importDefault(require("../../src/models/product"));
// Create a new product
const Create__ROOM__POST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const isHasRoom = yield room_1.default.findOne({ organization: user.organization });
        const { title, description } = req.body;
        if (isHasRoom) {
            const roomToChange = yield room_1.default.findById({
                organization: user.organization
            });
            roomToChange.title = title;
            roomToChange.description = description;
            res.status(201).json({ status: "success", data: roomToChange });
        }
        else {
            const room = yield room_1.default.create({
                title,
                description,
                organization: user.organization
            });
            res.status(201).json({ status: "success", data: room });
        }
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Create__ROOM__POST = Create__ROOM__POST;
const Upload__ROOM_IMAGE__POST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const ID = req.params.roomID;
    const files = req.files;
    const room = yield room_1.default.findById(ID);
    if (!room) {
        return res
            .status(400)
            .json({ status: "error", message: "Invalid Category ID" });
    }
    if ((_a = files["roomBanner"]) === null || _a === void 0 ? void 0 : _a[0]) {
        const roomBannerFile = (_b = files["roomBanner"]) === null || _b === void 0 ? void 0 : _b[0];
        room.roomBanner = roomBannerFile.filename;
    }
    else {
        return res
            .status(400)
            .json({ status: "error", message: "No Image Selected" });
    }
    room.save();
    return res.json({
        message: "Files uploaded successfully!"
    });
});
exports.Upload__ROOM_IMAGE__POST = Upload__ROOM_IMAGE__POST;
const Fetch__ROOMS__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield room_1.default.find();
        res.json({ status: "success", data: products });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Fetch__ROOMS__GET = Fetch__ROOMS__GET;
// Get a single product by ID
const Fetch__ROOM_FOR_CLIENT__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var { roomName } = req.params;
        if (!roomName) {
            return res
                .status(404)
                .json({ status: "error", error: "Room Name is required" });
        }
        roomName = roomName.split("_").join(" ");
        const room = yield room_1.default.findOne({ title: roomName });
        if (!room) {
            return res
                .status(404)
                .json({ status: "error", error: "Invalid Room Name" });
        }
        const organization = yield models_1.Organization.findById(room.organization);
        const organizationCategories = yield category_1.default.find({
            organization: organization
        });
        const roomData = {
            room: room,
            organizationCategories,
            organizationData: organization
        };
        return res.json({ status: "success", data: roomData });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Fetch__ROOM_FOR_CLIENT__GET = Fetch__ROOM_FOR_CLIENT__GET;
const Fetch__ROOMS_FOR_CLIENT__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const room = yield room_1.default.find();
        return res.json({ status: "success", data: room });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Fetch__ROOMS_FOR_CLIENT__GET = Fetch__ROOMS_FOR_CLIENT__GET;
const Fetch__CATEGORIES_PRODUCTS_FOR_CLIENT__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var { roomName, categoryID } = req.params;
        if (!roomName) {
            return res
                .status(404)
                .json({ status: "error", error: "Room Name is required" });
        }
        roomName = roomName.split("_").join(" ");
        const room = yield room_1.default.findOne({ title: roomName });
        if (!room) {
            return res
                .status(404)
                .json({ status: "error", error: "Invalid Room Name" });
        }
        const organization = yield models_1.Organization.findById(room.organization);
        const organizationCategory = yield category_1.default.findOne({
            _id: categoryID
        });
        const categoryProducts = yield product_1.default.find({
            category: { $in: [organizationCategory._id] }
        });
        const categoryProductsAndType = {
            organizationCategory,
            categoryProducts
        };
        return res.json({
            status: "success",
            data: categoryProductsAndType
        });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Fetch__CATEGORIES_PRODUCTS_FOR_CLIENT__GET = Fetch__CATEGORIES_PRODUCTS_FOR_CLIENT__GET;
const Fetch__ROOM__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    try {
        const user = req.user;
        if ((_c = req.permissions) === null || _c === void 0 ? void 0 : _c.readOwn) {
            console.log(user.organization);
            const room = yield room_1.default.findOne({ organization: user.organization });
            if (!room) {
                return res
                    .status(404)
                    .json({ status: "error", error: "Room not found" });
            }
            return res.json({ status: "success", data: room });
        }
        if ((_d = req.permissions) === null || _d === void 0 ? void 0 : _d.readAny) {
            const rooms = yield room_1.default.find({});
            if (!rooms) {
                return res
                    .status(404)
                    .json({ status: "error", error: "Room not found" });
            }
            return res.json({ status: "success", data: rooms });
        }
        return res.status(401).json({ status: "error", error: "Unauthorised" });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Fetch__ROOM__GET = Fetch__ROOM__GET;
// Update a product by ID
const Update__ROOM__PUT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const { name, description, pictures } = req.body;
        const updatedRoom = yield room_1.default.findByIdAndUpdate({ organization: user.organization }, { name, description, pictures }, { new: true });
        if (!updatedRoom) {
            return res
                .status(404)
                .json({ status: "error", error: "Product not found" });
        }
        res.json({ status: "success", data: updatedRoom });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Update__ROOM__PUT = Update__ROOM__PUT;
// Delete a product by ID
const Delete__ROOM__DESTROY = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryId = req.params.categoryId;
        const deletedRoom = yield room_1.default.findByIdAndDelete(categoryId);
        if (!deletedRoom) {
            return res
                .status(404)
                .json({ status: "error", error: "Product not found" });
        }
        res.json({ status: "success", data: deletedRoom });
    }
    catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});
exports.Delete__ROOM__DESTROY = Delete__ROOM__DESTROY;
//# sourceMappingURL=Room-Controller.js.map