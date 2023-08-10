import express from "express";
import {
  Create_Admin__AUTH__POST,
  Fetch__USER_PROFILE__POST,
  SignIn__AUTH__POST,
  SignUp__AUTH__POST
} from "../controllers/Auth-Controller";
import { AuthenticateUser } from "../middleware/require-auth";
import { forgotPasswordController } from "../controllers/ForgotPassword-Controller";
import { body } from "express-validator";
import { ValidateRequest } from "../middleware/validate-request";

const authRouter = express.Router();

authRouter.post(
  "/signin",

  SignIn__AUTH__POST
);
authRouter.post(
  "/signup",
  [
    body("firstName").notEmpty().withMessage("Firstname is required"),
    body("lastName").notEmpty().withMessage("Lastname is required"),
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email address"),
    body("password").notEmpty().withMessage("Password is required"),
    body("roles").notEmpty().withMessage("User roles is required")
  ],
  ValidateRequest,
  SignUp__AUTH__POST
);
authRouter.post(
  "/createAdmin",
  [
    body("firstName").notEmpty().withMessage("Firstname is required"),
    body("lastName").notEmpty().withMessage("Lastname is required"),
    body("verificationToken")
      .notEmpty()
      .withMessage("Verification Token is required"),
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email address"),
    body("password").notEmpty().withMessage("Password is required")
  ],
  ValidateRequest,
  Create_Admin__AUTH__POST
);

authRouter.get("/me", AuthenticateUser, Fetch__USER_PROFILE__POST);
authRouter.get("/forgotPassword", forgotPasswordController);

export default authRouter;
