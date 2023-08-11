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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delete__ORGANIZATION__DELETE = exports.Upload__OGANIZATION_LOGO__POST = exports.Update__ORGANIZATION__PUT = exports.Fetch__ORGANIZATION__GET = exports.Fetch__ORGANIZATIONS__GET = exports.Create__ORGANIZATION__POST = void 0;
const organization_1 = require("../models/organization");
const Create__ORGANIZATION__POST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract organization data from the request body
        const { name, logo, description, contactDetails } = req.body;
        // Create a new organization
        const organization = yield organization_1.Organization.create({
            name,
            logo,
            description,
            contactDetails
        });
        return res.status(201).json({ status: "success", data: organization });
    }
    catch (error) {
        console.error("Error creating organization:", error);
        return res
            .status(500)
            .json({ status: "error", error: "Internal server error" });
    }
});
exports.Create__ORGANIZATION__POST = Create__ORGANIZATION__POST;
const Fetch__ORGANIZATIONS__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const organizations = yield organization_1.Organization.find();
        return res.json({ status: "success", data: organizations });
    }
    catch (error) {
        console.error("Error fetching organizations:", error);
        return res
            .status(500)
            .json({ status: "error", error: "Internal server error" });
    }
    return res
        .status(500)
        .json({ status: "error", error: "Internal server error" });
});
exports.Fetch__ORGANIZATIONS__GET = Fetch__ORGANIZATIONS__GET;
const Fetch__ORGANIZATION__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const organization = yield organization_1.Organization.findById(user.organization);
        if (!organization) {
            return res
                .status(404)
                .json({ status: "error", error: "Organization not found" });
        }
        return res.json({ status: "success", data: organization });
    }
    catch (error) {
        console.error("Error fetching organization:", error);
        return res
            .status(500)
            .json({ status: "error", error: "Internal server error" });
    }
});
exports.Fetch__ORGANIZATION__GET = Fetch__ORGANIZATION__GET;
const Update__ORGANIZATION__PUT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const { name, logo, description, organizationContact } = req.body;
        const organization = yield organization_1.Organization.findByIdAndUpdate(user.organization, { name, logo, description, organizationContact }, { new: true });
        if (!organization) {
            return res
                .status(404)
                .json({ status: "error", error: "Organization not found" });
        }
        return res.json({ status: "success", data: organization });
    }
    catch (error) {
        console.error("Error updating organization:", error);
        return res
            .status(500)
            .json({ status: "error", error: "Internal server error" });
    }
});
exports.Update__ORGANIZATION__PUT = Update__ORGANIZATION__PUT;
const Upload__OGANIZATION_LOGO__POST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const ID = req.params.organizationID;
    const files = req.files;
    const organization = yield organization_1.Organization.findById(ID);
    if (!organization) {
        return res
            .status(400)
            .json({ status: "error", message: "Invalid Category ID" });
    }
    if ((_a = files["organizationLogo"]) === null || _a === void 0 ? void 0 : _a[0]) {
        const organizationLogo = (_b = files["organizationLogo"]) === null || _b === void 0 ? void 0 : _b[0];
        organization.logo = organizationLogo.filename;
    }
    else {
        return res
            .status(400)
            .json({ status: "error", message: "No Image Selected" });
    }
    organization.save();
    return res.json({
        message: "Files uploaded successfully!"
    });
});
exports.Upload__OGANIZATION_LOGO__POST = Upload__OGANIZATION_LOGO__POST;
const Delete__ORGANIZATION__DELETE = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const organization = yield organization_1.Organization.findByIdAndDelete(id);
        if (!organization) {
            return res
                .status(404)
                .json({ status: "error", error: "Organization not found" });
        }
        return res.json({
            status: "success",
            message: "Organization deleted successfully"
        });
    }
    catch (error) {
        console.error("Error deleting organization:", error);
        return res
            .status(500)
            .json({ status: "error", error: "Internal server error" });
    }
});
exports.Delete__ORGANIZATION__DELETE = Delete__ORGANIZATION__DELETE;
//# sourceMappingURL=Organization-Controller.js.map