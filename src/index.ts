import { NextFunction, Request, Response } from "express";
import ExpressLoader from "./loaders/express";
import UserController from "./controllers/userRoute";

const expressApp = new ExpressLoader();
expressApp.app.get("/", (req: Request, res: Response) => res.status(200).send("ddd"));
expressApp.useController("/", UserController);
expressApp.app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

expressApp.listen(3000);
