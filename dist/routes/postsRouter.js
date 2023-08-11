"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Post_Controller_1 = require("../controllers/Post-Controller");
const validate_request_1 = require("../middleware/validate-request");
const express_validator_1 = require("express-validator");
const require_auth_1 = require("../middleware/require-auth");
const has_permission_1 = require("../middleware/has-permission");
const postRouter = express_1.default.Router();
postRouter.get("/", require_auth_1.AuthenticateUser, (0, has_permission_1.hasPermission)("fetch"), Post_Controller_1.Fetch__POST__POST);
postRouter.post("/", [
    (0, express_validator_1.body)("title").notEmpty().withMessage("Title is required"),
    (0, express_validator_1.body)("description").notEmpty().withMessage("Title is required"),
    (0, express_validator_1.body)("images").notEmpty().withMessage("Images is required"),
    (0, express_validator_1.body)("categories").notEmpty().withMessage("Category is required")
], validate_request_1.ValidateRequest, require_auth_1.AuthenticateUser, (0, has_permission_1.hasPermission)("post"), Post_Controller_1.Create__POST__POST);
postRouter.put("/:postId", [
    (0, express_validator_1.body)("title").optional().notEmpty().withMessage("Title is required"),
    (0, express_validator_1.body)("content").optional().notEmpty().withMessage("Content is required")
], validate_request_1.ValidateRequest, require_auth_1.AuthenticateUser, (0, has_permission_1.hasPermission)("put"), Post_Controller_1.Update__POST__PUT);
postRouter.delete("/:postId/images/:imageId", require_auth_1.AuthenticateUser, (0, has_permission_1.hasPermission)("delete"), Post_Controller_1.Delete__POST__DELETE);
exports.default = postRouter;
//# sourceMappingURL=postsRouter.js.map