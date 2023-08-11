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
exports.verifyToken = exports.createToken = void 0;
const token_1 = require("../models/token");
const createToken = (organizationId, token, maxUses, expiresAt) => __awaiter(void 0, void 0, void 0, function* () {
    const now = new Date();
    const futureDate = new Date(now.getTime() + expiresAt * 24 * 60 * 60 * 1000);
    try {
        const newToken = new token_1.Token({
            organization: organizationId,
            token,
            maxUses,
            expiresAt: futureDate
        });
        yield newToken.save();
        return newToken;
    }
    catch (error) {
        console.log(error);
        throw new Error("Error creating token");
    }
});
exports.createToken = createToken;
const verifyToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenDoc = yield token_1.Token.findOne({ token });
        if (!tokenDoc) {
            return null;
        }
        if (tokenDoc.currentUses >= tokenDoc.maxUses) {
            return null;
        }
        if (tokenDoc.expiresAt < Date.now()) {
            return null;
        }
        tokenDoc.currentUses += 1;
        yield tokenDoc.save();
        return tokenDoc;
    }
    catch (error) {
        throw new Error("Error verifying token");
    }
});
exports.verifyToken = verifyToken;
module.exports = {
    createToken: exports.createToken,
    verifyToken: exports.verifyToken
};
//# sourceMappingURL=tokenMethods.js.map