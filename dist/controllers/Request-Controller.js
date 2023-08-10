"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fetch__REQUEST__GET = exports.Approve__REQUEST__PUT = exports.Create__REQUEST__POST = void 0;
const models_1 = require("../models");
const organization_token_1 = __importDefault(require("../services/organization-token"));
const sendApproveSuccessMail_1 = __importDefault(require("../services/sendApproveSuccessMail"));
const sendConfirmRequestMail_1 = __importDefault(require("../services/sendConfirmRequestMail"));
const tokenMethods_1 = require("../services/tokenMethods");
const Create__REQUEST__POST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { organizationDetails, contactPerson } = req.body;
        const request = yield models_1.RequestModel.create({
            organizationDetails: {
                name: organizationDetails.name,
                address: organizationDetails.address,
                email: organizationDetails.email,
                description: organizationDetails.description,
                officeNumber: organizationDetails.officeNumber
            },
            contactPerson: {
                lastName: contactPerson.lastName,
                firstName: contactPerson.firstName,
                email: contactPerson.email,
                phoneNumber: contactPerson.phoneNumber,
                companyRole: contactPerson.companyRole
            }
        });
        (0, sendConfirmRequestMail_1.default)(contactPerson.email);
        (0, sendConfirmRequestMail_1.default)(organizationDetails.email);
        return res.status(201).json({ status: "success", data: request });
    }
    catch (error) {
        console.error("Error creating request:", error);
        return res
            .status(500)
            .json({ status: "error", error: "Internal server error" });
    }
});
exports.Create__REQUEST__POST = Create__REQUEST__POST;
const Approve__REQUEST__PUT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { requestId } = req.params;
        const newRequest = yield models_1.RequestModel.findById(requestId);
        if (!newRequest) {
            return res
                .status(404)
                .json({ status: "error", error: "Request not found" });
        }
        const organization = yield models_1.Organization.create({
            name: newRequest.organizationDetails.name,
            description: newRequest.organizationDetails.description,
            email: newRequest.organizationDetails.email,
            address: newRequest.organizationDetails.address
        });
        const OrgverificationToken = yield (0, organization_token_1.default)({
            organizationId: organization.id,
            organizationName: organization.name
        });
        organization.verificationToken = OrgverificationToken;
        organization.save();
        yield models_1.User.create({
            email: newRequest.contactPerson.email,
            password: "temporary_password",
            role: "admin",
            organization: organization._id
        });
        newRequest.status = "approved";
        yield newRequest.save();
        yield (0, tokenMethods_1.createToken)(organization._id, OrgverificationToken, 10, 40);
        (0, sendApproveSuccessMail_1.default)(newRequest.contactPerson.email, OrgverificationToken);
        return res.json({ status: "success", data: organization });
    }
    catch (error) {
        console.error("Error approving request:", error);
        return res
            .status(404)
            .json({ status: "error", error: "Internal server error" });
    }
});
exports.Approve__REQUEST__PUT = Approve__REQUEST__PUT;
const Fetch__REQUEST__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requests = yield models_1.RequestModel.find();
        return res.json({ status: "success", data: requests });
    }
    catch (error) {
        return res
            .status(500)
            .json({ status: "error", error: "Internal server error" });
    }
});
exports.Fetch__REQUEST__GET = Fetch__REQUEST__GET;
//# sourceMappingURL=Request-Controller.js.map