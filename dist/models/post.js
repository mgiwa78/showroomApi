"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PostSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: [
        {
            id: { type: mongoose_1.Types.ObjectId },
            url: {
                type: String,
                required: true
            },
            altText: String,
            description: String,
            title: String
        }
    ],
    texts: [
        {
            content: {
                type: String,
                required: true
            },
            isBold: Boolean
        }
    ],
    categories: [
        {
            name: {
                type: String,
                required: true
            }
        }
    ],
    organization: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Organization",
        required: true
    }
}, { timestamps: true });
const Post = (0, mongoose_1.model)("Post", PostSchema);
exports.default = Post;
//# sourceMappingURL=post.js.map