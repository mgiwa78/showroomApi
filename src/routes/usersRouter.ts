import express from "express";
import {
  Fetch__USERS__GET,
  Update__USER__PUT,
  Update__OWN_USER__PUT,
  Delete__USER__DELETE
} from "../controllers/User-Controller";
import { AuthenticateUser } from "../middleware/require-auth";
import { hasPermission } from "../middleware/has-permission";

const router = express.Router();

router.get("/", AuthenticateUser, hasPermission("fetch"), Fetch__USERS__GET);

router.put(
  "/:userId",
  AuthenticateUser,
  hasPermission("put"),
  Update__USER__PUT
);

router.put(
  "/profile",
  AuthenticateUser,
  hasPermission("put"),
  Update__OWN_USER__PUT
);

router.delete(
  "/:id",
  AuthenticateUser,
  hasPermission("delete"),
  Delete__USER__DELETE
);

export default router;
