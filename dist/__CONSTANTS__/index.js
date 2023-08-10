"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGO_URI = exports.JWT_SECRET = exports.PASSWORD = exports.EMAIL = void 0;
require("dotenv").config();
const EMAIL = "mgiwa78@gmail.com";
exports.EMAIL = EMAIL;
const PASSWORD = "rsdaxgcljgxyfgzj";
exports.PASSWORD = PASSWORD;
const JWT_SECRET = "sdsdfo8y2jkfbdfsdf";
exports.JWT_SECRET = JWT_SECRET;
process.env.NODE_ENV === "development";
// const MONGO_URI = "mongodb://127.0.0.1:27017/show-room";
const MONGO_URI = process.env.NODE_ENV === "development"
    ? "mongodb://127.0.0.1:27017/show-room"
    : "mongodb+srv://vercel-admin-user:XSUQj0QdXR7G61It@cluster0.za7xrpe.mongodb.net/show-room?retryWrites=true&w=majority";
exports.MONGO_URI = MONGO_URI;
console.log(MONGO_URI);
//# sourceMappingURL=index.js.map