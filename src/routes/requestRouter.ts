import express from "express";
import {
  Approve__REQUEST__PUT,
  Create__REQUEST__POST,
  Fetch__REQUEST__GET
} from "../controllers/Request-Controller";
import { ValidateRequest } from "../middleware/validate-request";
import { body, param } from "express-validator";
import { hasPermission } from "../middleware/has-permission";
import { AuthenticateUser } from "../middleware/require-auth";

const requestRouter = express.Router();

requestRouter.post(
  "/",
  body("organizationDetails.name")
    .notEmpty()
    .withMessage("Organization name is required"),
  body("organizationDetails.email")
    .notEmpty()
    .withMessage("Contact email is required")
    .isEmail()
    .withMessage("Invalid email address"),
  body("organizationDetails.officeNumber")
    .notEmpty()
    .withMessage("Office number is required"),
  body("organizationDetails.description")
    .notEmpty()
    .withMessage("Organization description is required"),
  body("organizationDetails.address")
    .notEmpty()
    .withMessage("Address is required"),
  body("contactPerson.firstName")
    .notEmpty()
    .withMessage("First name is required"),
  body("contactPerson.lastName")
    .notEmpty()
    .withMessage("Last name is required"),
  body("contactPerson").notEmpty().withMessage("Contact details are required"),
  body("contactPerson.companyRole")
    .notEmpty()
    .withMessage("Company role is required"),
  ValidateRequest,
  Create__REQUEST__POST
);

requestRouter.put(
  "/:requestId/approve",
  param("requestId").notEmpty().withMessage("Request id is required"),
  ValidateRequest,
  AuthenticateUser,
  hasPermission("put"),
  Approve__REQUEST__PUT
);

requestRouter.get("/", Fetch__REQUEST__GET);
export default requestRouter;
