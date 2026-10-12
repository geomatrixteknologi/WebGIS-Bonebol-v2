import { AppDataSource } from "./data-source";
import express from "express";
import * as dotenv from "dotenv";
import apiRouter from "./routes/apiRouter";
import cors from "cors";
import "reflect-metadata";

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [`${process.env.CLIENT_URL1}`, `${process.env.CLIENT_URL2}`],
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  })
);

app.use("/api", apiRouter);
app.use("/public", express.static("./public"));
const PORT = 8180;

AppDataSource.initialize()
  .then(async () => {
    await console.log("Database connected successfully!");
    app.listen(PORT, () => {
      console.log(`  ➜  [API] Local: http://localhost:${PORT}/`);
    });
  })
  .catch((error) => console.log(error));

app.get("/test", (req: express.Request, res: express.Response) => {
  res.status(200).json({
    success: true,
    message: "API is working",
  });
});
