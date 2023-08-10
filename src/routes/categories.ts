import { Router } from "express";
import {
  Create__CATEGORY__POST,
  Update__CATEGORY__PUT,
  Fetch__CATEGORIES__GET,
  Fetch__CATEGORY__GET,
  Delete__CATEGORY__DESTROY,
  Upload__CATEGORY_IMAGE__POST
} from "../controllers/Category-Controller";
import { body } from "express-validator";
import { ValidateRequest } from "../middleware/validate-request";
import { uploadCategory } from "../middleware/multer";
import { AuthenticateUser } from "../middleware/require-auth";

const categoryRouter: Router = Router();

categoryRouter.post(
  "/",
  [
    body("name").notEmpty().withMessage("Product name is required"),
    body("description")
      .notEmpty()
      .withMessage("Product description is required")
  ],
  ValidateRequest,
  AuthenticateUser,
  Create__CATEGORY__POST
);

categoryRouter.post(
  "/image/:categoryID",
  uploadCategory.fields([{ name: "categoryBanner", maxCount: 1 }]),
  AuthenticateUser,
  Upload__CATEGORY_IMAGE__POST
);

categoryRouter.get("/", AuthenticateUser, Fetch__CATEGORIES__GET);
categoryRouter.get("/:categoryId", AuthenticateUser, Fetch__CATEGORY__GET);
categoryRouter.put("/:categoryId", AuthenticateUser, Update__CATEGORY__PUT);
categoryRouter.delete(
  "/:categoryId",
  AuthenticateUser,
  Delete__CATEGORY__DESTROY
);

export default categoryRouter;
