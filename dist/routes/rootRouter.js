"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const usersRouter_1 = __importDefault(require("./usersRouter"));
const organization_1 = __importDefault(require("./organization"));
const requestRouter_1 = __importDefault(require("./requestRouter"));
const postsRouter_1 = __importDefault(require("./postsRouter"));
const product_1 = __importDefault(require("./product"));
const categories_1 = __importDefault(require("./categories"));
const roomRouter_1 = __importDefault(require("./roomRouter"));
const clientRouter_1 = __importDefault(require("./clientRouter"));
let rootRouter = (0, express_1.Router)();
rootRouter.get("/", (req, res) => {
    res.send("Show room API is running 🥳");
});
rootRouter.use("/auth", auth_1.default);
rootRouter.use("/organizations", organization_1.default);
rootRouter.use("/categories", categories_1.default);
rootRouter.use("/rooms", roomRouter_1.default);
rootRouter.use("/posts", postsRouter_1.default);
rootRouter.use("/products", product_1.default);
rootRouter.use("/requests", requestRouter_1.default);
rootRouter.use("/users", usersRouter_1.default);
rootRouter.use("/client", clientRouter_1.default);
exports.default = rootRouter;
//# sourceMappingURL=rootRouter.js.map