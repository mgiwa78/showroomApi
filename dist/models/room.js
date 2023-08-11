"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomSchema = void 0;
const mongoose_1 = require("mongoose");
exports.roomSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    roomBanner: { type: String, default: null },
    organization: { type: mongoose_1.Schema.Types.ObjectId, ref: "Organization" }
}, { timestamps: true });
const Room = (0, mongoose_1.model)("Room", exports.roomSchema);
exports.default = Room;
//# sourceMappingURL=room.js.map