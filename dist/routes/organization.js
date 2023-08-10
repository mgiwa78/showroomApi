"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Organization_Controller_1 = require("../controllers/Organization-Controller");
const require_auth_1 = require("../middleware/require-auth");
const has_permission_1 = require("../middleware/has-permission");
const express_validator_1 = require("express-validator");
const validate_request_1 = require("../middleware/validate-request");
const User_Controller_1 = require("../controllers/User-Controller");
const multer_1 = require("../middleware/multer");
const organizationRouter = express_1.default.Router();
organizationRouter.post("/", [
    (0, express_validator_1.body)("name").notEmpty().withMessage("Organization name is required"),
    (0, express_validator_1.body)("contactDetails.email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email address"),
    (0, express_validator_1.body)("contactDetails.officeNumber")
        .notEmpty()
        .withMessage("Office number is required"),
    (0, express_validator_1.body)("contactDetails.address").notEmpty().withMessage("Address is required")
], validate_request_1.ValidateRequest, Organization_Controller_1.Create__ORGANIZATION__POST);
organizationRouter.get("/", require_auth_1.AuthenticateUser, (0, has_permission_1.hasPermission)("fetch"), Organization_Controller_1.Fetch__ORGANIZATIONS__GET);
organizationRouter.get("/profile", require_auth_1.AuthenticateUser, (0, has_permission_1.hasPermission)("fetch"), Organization_Controller_1.Fetch__ORGANIZATION__GET);
organizationRouter.put("/", [
    (0, express_validator_1.body)("name").notEmpty().withMessage("Organization name is required"),
    (0, express_validator_1.body)("description").notEmpty().withMessage("Description is required"),
    (0, express_validator_1.body)("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email address"),
    (0, express_validator_1.body)("organizationContact")
        .notEmpty()
        .withMessage("Office number is required"),
    (0, express_validator_1.body)("address").notEmpty().withMessage("Address is required")
], validate_request_1.ValidateRequest, require_auth_1.AuthenticateUser, (0, has_permission_1.hasPermission)("put"), Organization_Controller_1.Update__ORGANIZATION__PUT);
organizationRouter.get("/organizations/:organizationId/users", require_auth_1.AuthenticateUser, (0, has_permission_1.hasPermission)("fetch"), User_Controller_1.Fetch__ORGANIZATIONS_USERS__GET);
organizationRouter.delete("/:id", require_auth_1.AuthenticateUser, (0, has_permission_1.hasPermission)("delete"), Organization_Controller_1.Delete__ORGANIZATION__DELETE);
organizationRouter.post("/image/:organizationID", multer_1.uploadOrganizationLogo.fields([{ name: "organizationLogo", maxCount: 1 }]), require_auth_1.AuthenticateUser, Organization_Controller_1.Upload__OGANIZATION_LOGO__POST);
exports.default = organizationRouter;
//# sourceMappingURL=organization.js.map