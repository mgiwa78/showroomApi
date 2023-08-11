"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Room_Controller_1 = require("../controllers/Room-Controller");
const clientRouter = (0, express_1.Router)();
clientRouter.get("/room/:roomName", Room_Controller_1.Fetch__ROOM_FOR_CLIENT__GET);
clientRouter.get("/rooms", Room_Controller_1.Fetch__ROOMS_FOR_CLIENT__GET);
clientRouter.get("/:roomName/:categoryID/products", Room_Controller_1.Fetch__CATEGORIES_PRODUCTS_FOR_CLIENT__GET);
exports.default = clientRouter;
///////////////////////
//# sourceMappingURL=clientRouter.js.map