"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    contactNumber: { type: String, required: false },
    address: { type: String, required: false },
    lastName: { type: String, required: true },
    roles: {
        type: [String],
        enum: ["Super Admin", "Regular", "Organization Admin"],
        required: true
    },
    organization: { type: mongoose_1.Schema.Types.ObjectId, ref: "Organization" }
});
exports.User = (0, mongoose_1.model)("User", userSchema);
//# sourceMappingURL=user.js.map