require("dotenv").config();

const EMAIL = "mgiwa78@gmail.com";
const PASSWORD = "rsdaxgcljgxyfgzj";
const JWT_SECRET = "sdsdfo8y2jkfbdfsdf";

process.env.NODE_ENV === "development";

// const MONGO_URI = "mongodb://127.0.0.1:27017/show-room";

const MONGO_URI =
  process.env.NODE_ENV === "development"
    ? "mongodb://127.0.0.1:27017/show-room"
    : "mongodb+srv://vercel-admin-user:XSUQj0QdXR7G61It@cluster0.za7xrpe.mongodb.net/show-room?retryWrites=true&w=majority";

console.log(MONGO_URI);
export { EMAIL, PASSWORD, JWT_SECRET, MONGO_URI };
