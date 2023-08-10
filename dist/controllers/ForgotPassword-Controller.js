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
exports.forgotPasswordController = void 0;
const user_1 = require("../models/user");
const sendResetPasswordMail_1 = __importDefault(require("../services/sendResetPasswordMail"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const forgotPasswordController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = yield user_1.User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const resetToken = jsonwebtoken_1.default.sign({ email }, "your-reset-secret-key", {
            expiresIn: "1h"
        });
        yield (0, sendResetPasswordMail_1.default)(email, resetToken);
        res.json({ message: "Reset token sent to your email" });
    }
    catch (error) {
        res.status(500).json({ error: "An error occurred" });
    }
});
exports.forgotPasswordController = forgotPasswordController;
//# sourceMappingURL=ForgotPassword-Controller.js.map