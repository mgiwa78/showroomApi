import { Router } from "express";
import {
  Create__ROOM__POST,
  Update__ROOM__PUT,
  Fetch__ROOMS__GET,
  Fetch__ROOM__GET,
  Delete__ROOM__DESTROY,
  Upload__ROOM_IMAGE__POST,
  Fetch__ROOM_FOR_CLIENT__GET
} from "../controllers/Room-Controller";
import { body } from "express-validator";
import { ValidateRequest } from "../middleware/validate-request";
import { uploadRoomBanner } from "../middleware/multer";
import { AuthenticateUser } from "../middleware/require-auth";
import { hasPermission } from "../middleware/has-permission";

const roomRouter: Router = Router();

roomRouter.post(
  "/",
  [
    body("title").notEmpty().withMessage("Room title is required"),
    body("description").notEmpty().withMessage("Room description is required")
  ],
  AuthenticateUser,
  ValidateRequest,
  Create__ROOM__POST
);

roomRouter.post(
  "/image/:roomID",
  uploadRoomBanner.fields([{ name: "roomBanner", maxCount: 1 }]),
  AuthenticateUser,
  Upload__ROOM_IMAGE__POST
);

// roomRouter.get("/", AuthenticateUser, Fetch__ROOMS__GET);
roomRouter.get("/", AuthenticateUser, hasPermission("fetch"), Fetch__ROOM__GET);
roomRouter.put("/:roomId", AuthenticateUser, Update__ROOM__PUT);
roomRouter.delete("/:roomId", AuthenticateUser, Delete__ROOM__DESTROY);

export default roomRouter;
