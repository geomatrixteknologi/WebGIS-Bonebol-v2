import "module-alias/register";
import express, { NextFunction, Request, Response, urlencoded } from "express";
import cors from "cors";
import apiRouter from "./router/api.router";
import "reflect-metadata";
import { PORT } from "./config";
import { AppDataSource } from "./data-resource";
import cookieParser from "cookie-parser";
import { redis } from "./utils/redis";

const app = express();

app.use(cookieParser(process.env.COOKIES_SECRET));
app.use(express.json());
app.use(cors({ origin: [`${process.env.CLIENT_URL1}`, `${process.env.CLIENT_URL2}`], methods: "GET,POST,PUT,DELETE", allowedHeaders: "Content-Type,Authorization", credentials: true }));
app.use(urlencoded({ extended: true }));
app.use("/api", apiRouter);
app.use("/public", express.static("./public"));

redis.connect().catch(() => {
  console.warn("[Redis] Could not connect - tile caching disabled, using DB only");
});

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`  ➜  [API] Local: http://localhost:${PORT}/`);
    });
  })
  .catch((error) => console.log(error));

app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "API is working",
  });
});
