import express from "express";
import {
  Create__POST__POST,
  Fetch__POST__POST,
  Update__POST__PUT,
  Delete__POST__DELETE
} from "../controllers/Post-Controller";
import { ValidateRequest } from "../middleware/validate-request";
import { body } from "express-validator";
import { AuthenticateUser } from "../middleware/require-auth";
import { hasPermission } from "../middleware/has-permission";

const postRouter = express.Router();

postRouter.get(
  "/",
  AuthenticateUser,
  hasPermission("fetch"),
  Fetch__POST__POST
);

postRouter.post(
  "/",
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Title is required"),
    body("images").notEmpty().withMessage("Images is required"),
    body("categories").notEmpty().withMessage("Category is required")
  ],
  ValidateRequest,
  AuthenticateUser,
  hasPermission("post"),
  Create__POST__POST
);

postRouter.put(
  "/:postId",
  [
    body("title").optional().notEmpty().withMessage("Title is required"),
    body("content").optional().notEmpty().withMessage("Content is required")
  ],
  ValidateRequest,
  AuthenticateUser,
  hasPermission("put"),
  Update__POST__PUT
);

postRouter.delete(
  "/:postId/images/:imageId",
  AuthenticateUser,
  hasPermission("delete"),
  Delete__POST__DELETE
);

export default postRouter;
