require("dotenv").config();
require("express-async-errors");
import express from "express";
const app = express();
import path from "path";
import rateLimiter from "express-rate-limit";
import helmet from "helmet";
import cors from "cors";
import cleanXss from "@engine/Security/xss";
import fileUpload from "express-fileupload";
import route from "./Engine/Routes";
import notFound from "@engine/CustomMiddleware/not-found";
import errHandler from "@engine/CustomMiddleware/err-handler";

app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Max number of requests allowed in the windowMs
    message: "Too many requests, please try again later.",
  })
);

// Set EJS as the view engine
app.set("view engine", "ejs");
// Specify the views directory
app.set("views", path.join(__dirname, "App", "Views"));

app.use(helmet());
app.use(cors());
app.use(cleanXss());
app.use(express.json());
app.use(express.static("./public"));
app.use(fileUpload());

route("get", "/", "home.index")(app);
route("get", "/happy", "home.index")(app);
route("get", "/rating/:id", "home.rating")(app);
app.use(notFound);
// for custom error, not implement yet.
app.use(errHandler);
const start = async () => {
  try {
    app.listen(3000, () => {
      console.log("server listen on port 3000");
    });
  } catch (error) {
    console.log(error);
  }
};
start();
