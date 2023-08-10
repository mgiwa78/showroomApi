import { Router } from "express";
import express from "express";

import authRouter from "./auth";
import userRouter from "./usersRouter";
import organizationRouter from "./organization";
import requestRouter from "./requestRouter";
import postRouter from "./postsRouter";
import productRouter from "./product";
import categoryRouter from "./categories";
import roomRouter from "./roomRouter";
import clientRouter from "./clientRouter";

let rootRouter = Router();

rootRouter.get("/", (req, res) => {
  res.send("Show room API is running 🥳");
});

rootRouter.use("/auth", authRouter);
rootRouter.use("/organizations", organizationRouter);
rootRouter.use("/categories", categoryRouter);
rootRouter.use("/rooms", roomRouter);
rootRouter.use("/posts", postRouter);
rootRouter.use("/products", productRouter);
rootRouter.use("/requests", requestRouter);
rootRouter.use("/users", userRouter);

rootRouter.use("/client", clientRouter);

export default rootRouter;
