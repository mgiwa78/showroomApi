import { Router } from "express";
import {
  Fetch__CATEGORIES_PRODUCTS_FOR_CLIENT__GET,
  Fetch__CATEGORY_FOR_CLIENT__GET,
  Fetch__ROOMS_FOR_CLIENT__GET,
  Fetch__ROOM_FOR_CLIENT__GET
} from "../controllers/Room-Controller";

const clientRouter: Router = Router();

clientRouter.get("/room/:roomName", Fetch__ROOM_FOR_CLIENT__GET);
clientRouter.get("/rooms", Fetch__ROOMS_FOR_CLIENT__GET);
clientRouter.get(
  "/category/:categoryID/products",
  Fetch__CATEGORIES_PRODUCTS_FOR_CLIENT__GET
);
clientRouter.get("/category/:categoryID", Fetch__CATEGORY_FOR_CLIENT__GET);

export default clientRouter;
///////////////////////
