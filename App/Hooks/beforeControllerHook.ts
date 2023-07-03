import { Request, Response, NextFunction } from "express";

type Middleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => ReturnType<NextFunction>;

const beforeControllers: { cb: Middleware; methods: string[] }[] = [
  {
    cb: (req, res, next) => {
      console.log("before controller 1");
      next();
    },
    methods: ["get"],
  },
  {
    cb: async (req, res, next) => {
      await new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          console.log("before controller 2 with async");
          resolve();
          next();
        }, 2000);
      });
    },
    methods: ["get"],
  },
];

const filterController = (method: string) => {
  return beforeControllers
    .filter((controller) => {
      return controller.methods.includes(method);
    })
    .map((filteredController) => {
      return filteredController.cb;
    });
};

export default filterController;
