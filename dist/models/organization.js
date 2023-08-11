"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Organization = void 0;
const mongoose_1 = require("mongoose");
const organizationSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    logo: { type: String },
    description: { type: String, required: true },
    email: { type: String, required: true },
    organizationContact: { type: String, required: false },
    address: { type: String },
    verificationToken: { type: String }
});
exports.Organization = (0, mongoose_1.model)("Organization", organizationSchema);
//# sourceMappingURL=organization.js.map