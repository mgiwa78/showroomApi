"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Request_Controller_1 = require("../controllers/Request-Controller");
const validate_request_1 = require("../middleware/validate-request");
const express_validator_1 = require("express-validator");
const has_permission_1 = require("../middleware/has-permission");
const require_auth_1 = require("../middleware/require-auth");
const requestRouter = express_1.default.Router();
requestRouter.post("/", (0, express_validator_1.body)("organizationDetails.name")
    .notEmpty()
    .withMessage("Organization name is required"), (0, express_validator_1.body)("organizationDetails.email")
    .notEmpty()
    .withMessage("Contact email is required")
    .isEmail()
    .withMessage("Invalid email address"), (0, express_validator_1.body)("organizationDetails.officeNumber")
    .notEmpty()
    .withMessage("Office number is required"), (0, express_validator_1.body)("organizationDetails.description")
    .notEmpty()
    .withMessage("Organization description is required"), (0, express_validator_1.body)("organizationDetails.address")
    .notEmpty()
    .withMessage("Address is required"), (0, express_validator_1.body)("contactPerson.firstName")
    .notEmpty()
    .withMessage("First name is required"), (0, express_validator_1.body)("contactPerson.lastName")
    .notEmpty()
    .withMessage("Last name is required"), (0, express_validator_1.body)("contactPerson").notEmpty().withMessage("Contact details are required"), (0, express_validator_1.body)("contactPerson.companyRole")
    .notEmpty()
    .withMessage("Company role is required"), validate_request_1.ValidateRequest, Request_Controller_1.Create__REQUEST__POST);
requestRouter.put("/:requestId/approve", (0, express_validator_1.param)("requestId").notEmpty().withMessage("Request id is required"), validate_request_1.ValidateRequest, require_auth_1.AuthenticateUser, (0, has_permission_1.hasPermission)("put"), Request_Controller_1.Approve__REQUEST__PUT);
requestRouter.get("/", Request_Controller_1.Fetch__REQUEST__GET);
exports.default = requestRouter;
//# sourceMappingURL=requestRouter.js.map