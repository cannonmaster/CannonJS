import { Request, Response } from "express";
import { Application } from "express";
import filterCustomAction from "@app/Hooks/customActionHook";
import filterController from "@app/Hooks/beforeControllerHook";
import { StatusCodes } from "http-status-codes";
import { log } from "console";
import { NextFunction } from "connect";
interface MyApplication extends Application {
  [key: string]: any;
}

type routeType = (app: MyApplication) => any;

class Route {
  routes: routeType[] = [];
  public add(route: routeType) {
    this.routes.push(route);
  }
  public run(app: MyApplication) {
    this.routes.forEach((route) => {
      route(app);
    });
  }
}
const route = (method: string, route: string, handler: string) => {
  const [controller, action] = handler.split(".");
  const controllerClass = require(`../App/Controllers/${controller}`);
  const controllerInstance = new controllerClass().createProxy();
  return (app: MyApplication) => {
    app[method.toLowerCase()](
      route,
      ...[filterController(method.toLowerCase())],
      ...[filterCustomAction(route, method)],
      async (req: Request, res: Response, next: NextFunction) => {
        const params = { ...req.params, ...req.query, ...req.body };
        await controllerInstance[action](req, res, params);
      }
    );
  };
};

export default route;
