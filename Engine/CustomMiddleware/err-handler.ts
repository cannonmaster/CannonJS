import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction, Errback } from "express";
import { log } from "console";
const errHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const customErr = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong try again later",
  };

  return res.status(customErr.statusCode).json({ msg: customErr.msg });
};

export default errHandler;
