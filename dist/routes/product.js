"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Product_Controller_1 = require("../controllers/Product-Controller");
const express_validator_1 = require("express-validator");
const validate_request_1 = require("../../src/middleware/validate-request");
const multer_1 = require("../../src/middleware/multer");
const require_auth_1 = require("../middleware/require-auth");
const productRouter = (0, express_1.Router)();
productRouter.post("/", [
    (0, express_validator_1.body)("name").notEmpty().withMessage("Product name is required"),
    (0, express_validator_1.body)("description")
        .notEmpty()
        .withMessage("Product description is required"),
    (0, express_validator_1.body)("category").notEmpty().withMessage("Category is required")
], validate_request_1.ValidateRequest, require_auth_1.AuthenticateUser, Product_Controller_1.Create__PRODUCT__POST);
productRouter.post("/image/:productID", multer_1.uploadProducts.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "otherPictures", maxCount: 10 }
]), require_auth_1.AuthenticateUser, Product_Controller_1.Upload__PRODUCT_IMAGE__POST);
productRouter.get("/", require_auth_1.AuthenticateUser, Product_Controller_1.Fetch__PRODUCTS__GET);
productRouter.get("/:productId", require_auth_1.AuthenticateUser, Product_Controller_1.Fetch__PRODUCT__GET);
productRouter.put("/:productId", require_auth_1.AuthenticateUser, Product_Controller_1.Update__PRODUCT__PUT);
productRouter.delete("/:productId", require_auth_1.AuthenticateUser, Product_Controller_1.Delete__PRODUCT__DESTROY);
exports.default = productRouter;
//# sourceMappingURL=product.js.map