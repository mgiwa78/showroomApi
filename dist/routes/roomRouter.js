"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Room_Controller_1 = require("../controllers/Room-Controller");
const express_validator_1 = require("express-validator");
const validate_request_1 = require("../middleware/validate-request");
const multer_1 = require("../middleware/multer");
const require_auth_1 = require("../middleware/require-auth");
const has_permission_1 = require("../middleware/has-permission");
const roomRouter = (0, express_1.Router)();
roomRouter.post("/", [
    (0, express_validator_1.body)("title").notEmpty().withMessage("Room title is required"),
    (0, express_validator_1.body)("description").notEmpty().withMessage("Room description is required")
], require_auth_1.AuthenticateUser, validate_request_1.ValidateRequest, Room_Controller_1.Create__ROOM__POST);
roomRouter.post("/image/:roomID", multer_1.uploadRoomBanner.fields([{ name: "roomBanner", maxCount: 1 }]), require_auth_1.AuthenticateUser, Room_Controller_1.Upload__ROOM_IMAGE__POST);
// roomRouter.get("/", AuthenticateUser, Fetch__ROOMS__GET);
roomRouter.get("/", require_auth_1.AuthenticateUser, (0, has_permission_1.hasPermission)("fetch"), Room_Controller_1.Fetch__ROOM__GET);
roomRouter.put("/:roomId", require_auth_1.AuthenticateUser, Room_Controller_1.Update__ROOM__PUT);
roomRouter.delete("/:roomId", require_auth_1.AuthenticateUser, Room_Controller_1.Delete__ROOM__DESTROY);
exports.default = roomRouter;
//# sourceMappingURL=roomRouter.js.map