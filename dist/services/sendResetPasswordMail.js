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
const __CONSTANTS__1 = require("../__CONSTANTS__");
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: __CONSTANTS__1.EMAIL,
        pass: __CONSTANTS__1.PASSWORD
    }
});
exports.default = (email, token) => __awaiter(void 0, void 0, void 0, function* () {
    const emailHtml = `
<html ⚡4email>
  <head>
    <meta charset="utf-8">
    <style amp4email-boilerplate>body{visibility:hidden}</style>
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
  </head>
  <body>
    <h1>Reset Password</h1>
    <p>Here is your reset password token:</p>
    <p><strong>${token}</strong></p>
    <p>To reset your password, please click the following link:</p>
    <p><a href="http://example.com/reset-password?token=${token}">Reset Password</a></p>
    <p>If you did not request a password reset, please ignore this email.</p>
  </body>
</html>`;
    const mailOptions = {
        from: "your-gmail-email@gmail.com",
        to: email,
        subject: "Testing Gmail SMTP",
        text: token,
        html: emailHtml
    };
    yield transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
        }
        else {
            console.log("Email sent:", info.response);
        }
    });
});
//# sourceMappingURL=sendResetPasswordMail.js.map