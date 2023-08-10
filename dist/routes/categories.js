"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Category_Controller_1 = require("../controllers/Category-Controller");
const express_validator_1 = require("express-validator");
const validate_request_1 = require("../middleware/validate-request");
const multer_1 = require("../middleware/multer");
const require_auth_1 = require("../middleware/require-auth");
const categoryRouter = (0, express_1.Router)();
categoryRouter.post("/", [
    (0, express_validator_1.body)("name").notEmpty().withMessage("Product name is required"),
    (0, express_validator_1.body)("description")
        .notEmpty()
        .withMessage("Product description is required")
], validate_request_1.ValidateRequest, require_auth_1.AuthenticateUser, Category_Controller_1.Create__CATEGORY__POST);
categoryRouter.post("/image/:categoryID", multer_1.uploadCategory.fields([{ name: "categoryBanner", maxCount: 1 }]), require_auth_1.AuthenticateUser, Category_Controller_1.Upload__CATEGORY_IMAGE__POST);
categoryRouter.get("/", require_auth_1.AuthenticateUser, Category_Controller_1.Fetch__CATEGORIES__GET);
categoryRouter.get("/:categoryId", require_auth_1.AuthenticateUser, Category_Controller_1.Fetch__CATEGORY__GET);
categoryRouter.put("/:categoryId", require_auth_1.AuthenticateUser, Category_Controller_1.Update__CATEGORY__PUT);
categoryRouter.delete("/:categoryId", require_auth_1.AuthenticateUser, Category_Controller_1.Delete__CATEGORY__DESTROY);
exports.default = categoryRouter;
//# sourceMappingURL=categories.js.map