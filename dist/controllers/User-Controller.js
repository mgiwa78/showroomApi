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
exports.Delete__USER__DELETE = exports.Update__OWN_USER__PUT = exports.Update__USER__PUT = exports.Fetch__USERS__GET = exports.Fetch__ORGANIZATIONS_USERS__GET = void 0;
const user_1 = require("../models/user");
// Fetch users for an organization
const Fetch__ORGANIZATIONS_USERS__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const organizationId = req.params.organizationId;
        // Assuming organizationId is passed and validated appropriately
        const users = yield user_1.User.find({ organization: organizationId });
        return res.json({ status: "success", data: users });
    }
    catch (error) {
        console.error("Error fetching organization users:", error);
        return res
            .status(500)
            .json({ status: "error", error: "Internal server error" });
    }
});
exports.Fetch__ORGANIZATIONS_USERS__GET = Fetch__ORGANIZATIONS_USERS__GET;
// Fetch all users for an admin
const Fetch__USERS__GET = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.permissions.readAny) {
            const users = yield user_1.User.find();
            return res.json({ status: "success", data: users });
        }
        if (req.permissions.readOwn) {
            const users = yield user_1.User.find({ organization: req.user.organization });
            return res.json({ status: "success", data: users });
        }
    }
    catch (error) {
        console.error("Error fetching all users:", error);
        return res
            .status(500)
            .json({ status: "error", error: "Internal server error" });
    }
});
exports.Fetch__USERS__GET = Fetch__USERS__GET;
// Update a user
const Update__USER__PUT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const { name, email, password } = req.body;
        const user = yield user_1.User.findByIdAndUpdate(userId, { name, email, password }, { new: true });
        if (!user) {
            return res.status(404).json({ status: "error", error: "User not found" });
        }
        return res.json({ status: "success", data: user });
    }
    catch (error) {
        console.error("Error updating user:", error);
        return res
            .status(500)
            .json({ status: "error", error: "Internal server error" });
    }
});
exports.Update__USER__PUT = Update__USER__PUT;
// Update user's own profile
const Update__OWN_USER__PUT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id; // Assuming user ID is available in the request object
        const { name, email, password } = req.body;
        const user = yield user_1.User.findByIdAndUpdate(userId, { name, email, password }, { new: true });
        if (!user) {
            return res.status(404).json({ status: "error", error: "User not found" });
        }
        return res.json({ status: "success", data: user });
    }
    catch (error) {
        console.error("Error updating own profile:", error);
        return res
            .status(500)
            .json({ status: "error", error: "Internal server error" });
    }
});
exports.Update__OWN_USER__PUT = Update__OWN_USER__PUT;
const Delete__USER__DELETE = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield user_1.User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ status: "error", error: "user not found" });
        }
        return res.json({
            status: "success",
            message: "User deleted successfully"
        });
    }
    catch (error) {
        console.error("Error deleting User:", error);
        return res
            .status(500)
            .json({ status: "error", error: "Internal server error" });
    }
});
exports.Delete__USER__DELETE = Delete__USER__DELETE;
//# sourceMappingURL=User-Controller.js.map