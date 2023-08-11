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
exports.hasPermission = void 0;
const access_control_1 = require("../services/access-control");
const resolveUserRoles_1 = __importDefault(require("../_utils/resolveUserRoles"));
const hasPermission = (action) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("user");
        const { user } = req;
        const asset = req.baseUrl.replace("/", "");
        if (!user) {
            return res.status(403).json({ error: "Forbidden" });
        }
        const userRoles = yield (0, resolveUserRoles_1.default)(user.id);
        const allowed = {};
        if (!userRoles) {
            return res.status(403).json({ error: "Forbidden" });
        }
        userRoles === null || userRoles === void 0 ? void 0 : userRoles.forEach((role) => {
            switch (action) {
                case "fetch":
                    if (access_control_1.AccessControlInstance.can(role).readOwn(asset).granted) {
                        allowed.readOwn = access_control_1.AccessControlInstance.can(role).readOwn(asset);
                    }
                    if (access_control_1.AccessControlInstance.can(role).readAny(asset).granted) {
                        allowed.readAny = access_control_1.AccessControlInstance.can(role).readAny(asset);
                    }
                    break;
                case "put":
                    if (access_control_1.AccessControlInstance.can(role).updateOwn(asset).granted) {
                        allowed.updateOwn =
                            access_control_1.AccessControlInstance.can(role).updateOwn(asset);
                    }
                    if (access_control_1.AccessControlInstance.can(role).updateAny(asset).granted) {
                        allowed.updateAny =
                            access_control_1.AccessControlInstance.can(role).updateAny(asset);
                    }
                    break;
                case "post":
                    if (access_control_1.AccessControlInstance.can(role).createOwn(asset).granted) {
                        allowed.createOwn =
                            access_control_1.AccessControlInstance.can(role).createOwn(asset);
                    }
                    if (access_control_1.AccessControlInstance.can(role).createAny(asset).granted) {
                        allowed.createAny =
                            access_control_1.AccessControlInstance.can(role).createAny(asset);
                    }
                    break;
                case "delete":
                    if (access_control_1.AccessControlInstance.can(role).deleteAny(asset).granted) {
                        allowed.deleteAny =
                            access_control_1.AccessControlInstance.can(role).deleteAny(asset);
                    }
                    if (access_control_1.AccessControlInstance.can(role).deleteOwn(asset).granted) {
                        allowed.deleteOwn =
                            access_control_1.AccessControlInstance.can(role).deleteOwn(asset);
                    }
                    break;
            }
        });
        if (Object.keys(allowed).length) {
            req.permissions = allowed;
            next();
        }
        else {
            return res.status(403).json({ error: "Forbidden" });
        }
    });
};
exports.hasPermission = hasPermission;
//# sourceMappingURL=has-permission.js.map