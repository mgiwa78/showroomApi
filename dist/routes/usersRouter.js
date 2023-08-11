"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_Controller_1 = require("../controllers/User-Controller");
const require_auth_1 = require("../middleware/require-auth");
const has_permission_1 = require("../middleware/has-permission");
const router = express_1.default.Router();
router.get("/", require_auth_1.AuthenticateUser, (0, has_permission_1.hasPermission)("fetch"), User_Controller_1.Fetch__USERS__GET);
router.put("/:userId", require_auth_1.AuthenticateUser, (0, has_permission_1.hasPermission)("put"), User_Controller_1.Update__USER__PUT);
router.put("/profile", require_auth_1.AuthenticateUser, (0, has_permission_1.hasPermission)("put"), User_Controller_1.Update__OWN_USER__PUT);
router.delete("/:id", require_auth_1.AuthenticateUser, (0, has_permission_1.hasPermission)("delete"), User_Controller_1.Delete__USER__DELETE);
exports.default = router;
//# sourceMappingURL=usersRouter.js.map