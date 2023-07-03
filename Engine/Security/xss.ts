import xss from "xss";
import { Request, Response, NextFunction } from "express-serve-static-core";
const cleanXss = () => {
  const cleanObject = (obj: { [key: string]: any }): {} => {
    if (typeof obj !== "object" || obj === null) {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => cleanObject(item));
    }

    const cleanedObj: { [key: string]: any } = {};

    Object.keys(obj).forEach((key) => {
      const value = obj[key as keyof typeof obj];

      if (typeof value === "object" && value !== null) {
        cleanedObj[key] = cleanObject(value);
      } else {
        cleanedObj[key] = xss(value); // Clean the value using xss
      }
    });

    return cleanedObj;
  };
  return function (req: Request, res: Response, next: NextFunction) {
    req.body = cleanObject(req.body);
    req.params = cleanObject(req.params);
    req.query = cleanObject(req.query);

    next();
  };
};
export default cleanXss;
