import { Router } from "express";
import {
  Create__PRODUCT__POST,
  Update__PRODUCT__PUT,
  Fetch__PRODUCTS__GET,
  Fetch__PRODUCT__GET,
  Delete__PRODUCT__DESTROY,
  Upload__PRODUCT_IMAGE__POST
} from "../controllers/Product-Controller";
import { body } from "express-validator";
import { ValidateRequest } from "../../src/middleware/validate-request";
import { uploadProducts } from "../../src/middleware/multer";
import { AuthenticateUser } from "../middleware/require-auth";

const productRouter: Router = Router();

productRouter.post(
  "/",
  [
    body("name").notEmpty().withMessage("Product name is required"),
    body("description")
      .notEmpty()
      .withMessage("Product description is required"),
    body("category").notEmpty().withMessage("Category is required")
  ],
  ValidateRequest,
  AuthenticateUser,
  Create__PRODUCT__POST
);

productRouter.post(
  "/image/:productID",
  uploadProducts.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "otherPictures", maxCount: 10 }
  ]),
  AuthenticateUser,
  Upload__PRODUCT_IMAGE__POST
);

productRouter.get("/", AuthenticateUser, Fetch__PRODUCTS__GET);
productRouter.get("/:productId", AuthenticateUser, Fetch__PRODUCT__GET);
productRouter.put("/:productId", AuthenticateUser, Update__PRODUCT__PUT);
productRouter.delete("/:productId", AuthenticateUser, Delete__PRODUCT__DESTROY);

export default productRouter;
