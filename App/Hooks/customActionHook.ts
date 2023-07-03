import { Request, Response, NextFunction } from "express";

type Middleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => ReturnType<NextFunction>;

const customAction: { route: string; cb: Middleware; methods: string[] }[] = [
  {
    route: "/happy2",
    cb: (req, res, next) => {
      console.log("before action 1");
      next();
    },
    methods: ["get"],
  },
  {
    route: "/happy2",
    cb: async (req, res, next) => {
      await new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          console.log("before action2 with async");
          resolve();
          next();
        }, 2000);
      });
    },
    methods: ["get"],
  },
];

const filterCustomAction = (path: string, method: string) => {
  return customAction
    .filter((action) => {
      return action.methods.includes(method) && action.route === path;
    })
    .map((filteredCustomAction) => {
      return filteredCustomAction.cb;
    });
};

export default filterCustomAction;
