import express from "express";
import {
  Create__ORGANIZATION__POST,
  Fetch__ORGANIZATIONS__GET,
  Fetch__ORGANIZATION__GET,
  Update__ORGANIZATION__PUT,
  Delete__ORGANIZATION__DELETE,
  Upload__OGANIZATION_LOGO__POST
} from "../controllers/Organization-Controller";
import { AuthenticateUser } from "../middleware/require-auth";
import { hasPermission } from "../middleware/has-permission";
import { body } from "express-validator";
import { ValidateRequest } from "../middleware/validate-request";
import { Fetch__ORGANIZATIONS_USERS__GET } from "../controllers/User-Controller";
import { uploadOrganizationLogo } from "../middleware/multer";

const organizationRouter = express.Router();

organizationRouter.post(
  "/",
  [
    body("name").notEmpty().withMessage("Organization name is required"),
    body("contactDetails.email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email address"),
    body("contactDetails.officeNumber")
      .notEmpty()
      .withMessage("Office number is required"),
    body("contactDetails.address").notEmpty().withMessage("Address is required")
  ],
  ValidateRequest,
  Create__ORGANIZATION__POST
);

organizationRouter.get(
  "/",
  AuthenticateUser,
  hasPermission("fetch"),
  Fetch__ORGANIZATIONS__GET
);

organizationRouter.get(
  "/profile",
  AuthenticateUser,
  hasPermission("fetch"),
  Fetch__ORGANIZATION__GET
);

organizationRouter.put(
  "/",
  [
    body("name").notEmpty().withMessage("Organization name is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email address"),
    body("organizationContact")
      .notEmpty()
      .withMessage("Office number is required"),
    body("address").notEmpty().withMessage("Address is required")
  ],
  ValidateRequest,
  AuthenticateUser,
  hasPermission("put"),
  Update__ORGANIZATION__PUT
);

organizationRouter.get(
  "/organizations/:organizationId/users",
  AuthenticateUser,
  hasPermission("fetch"),
  Fetch__ORGANIZATIONS_USERS__GET
);

organizationRouter.delete(
  "/:id",
  AuthenticateUser,
  hasPermission("delete"),
  Delete__ORGANIZATION__DELETE
);

organizationRouter.post(
  "/image/:organizationID",
  uploadOrganizationLogo.fields([{ name: "organizationLogo", maxCount: 1 }]),
  AuthenticateUser,
  Upload__OGANIZATION_LOGO__POST
);

export default organizationRouter;
