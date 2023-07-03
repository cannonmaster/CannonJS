import BaseController from "@engine/BaseController";
import { log } from "console";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
class HomeController extends BaseController {
  constructor() {
    super();
  }
  public async indexAction(req: Request, res: Response, params: {}) {
    const users = await this.prisma.user.findMany();
    res.status(StatusCodes.OK).render("Home/index", { users });
  }
  public async ratingAction(
    req: Request,
    res: Response,
    params: { [key: string]: any }
  ) {
    console.log(params["id"]);
    // throw new Error("test error");
    res.status(StatusCodes.OK).send("OK");
  }
}

module.exports = HomeController;
