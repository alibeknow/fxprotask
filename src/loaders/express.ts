import express, { Express } from "express";
import BaseController from "../controllers/base";

type listenFunction = () => void;

export default class ExpressLoader {
  private _app: Express;

  constructor() {
    this.app = express();
    this.app.use(express.json());
  }

  get app(): Express {
    return this._app;
  }

  set app(value: Express) {
    this._app = value;
  }

  public useController(controllerOrAction: string | BaseController, controller?: BaseController) {
    if (typeof controllerOrAction === "string") {
      typeof controller === undefined && new Error("Please provide a controller");
      this.app.use(controllerOrAction, controller.router);
    } else {
      this.app.use(controllerOrAction.router);
    }
  }

  public listen(port: number, fn: listenFunction = () => console.log(`Running on port ${port}`)) {
    this.app.listen(port, fn);
  }
}
