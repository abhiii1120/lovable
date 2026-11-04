import express, { type Request, type Response } from "express";
import morgan from "morgan";
import router from "../routes/index.routes.js";

export function createApp() {
  let app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan("dev"));

  app.use("/api/projects", router);

  app.get("/_status/healthz", (req: Request, res: Response) => {
    res.status(200).json({
      message: "Server is Healthy",
    });
  });

  app.get("/_status/readyz", (req: Request, res: Response) => {
    res.status(200).json({
      message: "Server is Healthy",
    });
  });

  return app;
}
