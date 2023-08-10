"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = void 0;
const mongoose_1 = require("mongoose");
const requestSchema = new mongoose_1.Schema({
    organizationDetails: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        description: { type: String, required: true },
        officeNumber: { type: String, required: true },
        address: { type: String, required: true }
    },
    contactPerson: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        companyRole: { type: String, required: true }
    },
    status: { type: String, default: "pending" }
});
exports.Request = (0, mongoose_1.model)("Request", requestSchema);
//# sourceMappingURL=request.js.map