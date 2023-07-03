import { PrismaClient } from "@prisma/client";
class BaseController {
  protected prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  public createProxy() {
    return new Proxy(this, {
      get: function (target: any, name: any, receiver) {
        if (typeof target[name + "Action"] === "function") {
          return target[name + "Action"].bind(target);
        } else {
          throw new Error(
            `Method ${name} does not exist on the target object.`
          );
        }
      },
    });
  }
}

export default BaseController;
