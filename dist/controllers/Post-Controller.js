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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delete__POST__DELETE = exports.Update__POST__PUT = exports.Create__POST__POST = exports.Fetch__POST__POST = void 0;
const models_1 = require("../models");
const Fetch__POST__POST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return res.status(404).json({ status: "error", error: "Invalid User" });
    }
    if (!req.permissions)
        return res
            .status(403)
            .json({ status: "error", error: "You are not authorized " });
    if (req.permissions.readAny && req.permissions.readAny.granted) {
        console.log(req.permissions.readAny, req.permissions.readAny.granted);
        const posts = yield models_1.Post.find({});
        return res.send({
            status: "success",
            data: posts
        });
    }
    else if (req.permissions.readOwn && req.permissions.readOwn.granted) {
        const user = yield models_1.User.findById(req.user.id);
        const posts = yield models_1.Post.find({ organization: user === null || user === void 0 ? void 0 : user.organization });
        // const filteredPost = req.permissions.readOwn.filter(posts);
        return res.send({
            status: "success",
            data: posts
        });
    }
    else {
        return res
            .status(403)
            .json({ status: "error", error: "You are not authorized " });
    }
});
exports.Fetch__POST__POST = Fetch__POST__POST;
const Create__POST__POST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            return res.status(404).json({ status: "error", error: "Invalid User" });
        }
        if (!req.permissions)
            return res
                .status(403)
                .json({ status: "error", error: "You are not authorized " });
        if (req.permissions.createOwn && req.permissions.createOwn.granted) {
            const { title, description, images, texts, categories } = req.body;
            const user = yield models_1.User.findById(req.user.id);
            const organization = yield models_1.Organization.findById(user === null || user === void 0 ? void 0 : user.organization);
            console.log(organization);
            if (!organization) {
                return res
                    .status(404)
                    .json({ status: "error", error: "Organization not found" });
            }
            const post = yield models_1.Post.create({
                title,
                description,
                images,
                texts,
                categories,
                organization: organization.id
            });
            return res.status(201).json({ status: "success", data: post });
        }
    }
    catch (error) {
        console.error("Error creating post:", error);
        return res
            .status(500)
            .json({ status: "error", error: "Internal server error" });
    }
});
exports.Create__POST__POST = Create__POST__POST;
const Update__POST__PUT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            return res.status(404).json({ status: "error", error: "Invalid User" });
        }
        const organizationId = req.user.organization;
        const postId = req.params.postId;
        const { title, description, images, texts, categories } = req.body;
        const post = yield models_1.Post.findOne({
            _id: postId,
            organization: organizationId
        });
        if (!post) {
            return res.status(404).json({ status: "error", error: "Post not found" });
        }
        post.title = title;
        post.description = description;
        post.images = images;
        post.texts = texts;
        post.categories = categories;
        yield post.save();
        return res.json({ status: "success", data: post });
    }
    catch (error) {
        console.error("Error updating post:", error);
        return res
            .status(500)
            .json({ status: "error", error: "Internal server error" });
    }
});
exports.Update__POST__PUT = Update__POST__PUT;
const Delete__POST__DELETE = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            return res.status(404).json({ status: "error", error: "Invalid User" });
        }
        const organizationId = req.user.organization; // Assuming organization ID is available in the request object
        const postId = req.params.postId;
        const imageId = req.params.imageId;
        // Check if the organization owns the post
        const post = yield models_1.Post.findOne({
            _id: postId,
            organization: organizationId
        });
        if (!post) {
            return res.status(404).json({ status: "error", error: "Post not found" });
        }
        if (post.images) {
            post.images = post === null || post === void 0 ? void 0 : post.images.filter((image) => image.id.toString() !== imageId);
            yield post.save();
        }
        return res.json({ status: "success", data: post });
    }
    catch (error) {
        console.error("Error deleting image from post:", error);
        return res
            .status(500)
            .json({ status: "error", error: "Internal server error" });
    }
});
exports.Delete__POST__DELETE = Delete__POST__DELETE;
//# sourceMappingURL=Post-Controller.js.map