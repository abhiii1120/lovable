import express, { type Request, type Response } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { createAuthRouter } from "../routes/auth.routes.js";
import { errorMiddleware } from "../middlewares/error.middleware.js";

/**
 * Create the Express instance.
 *
 * @returns Configured Express app.
 */
export function createApp() {
  let app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan("dev"));
  app.use(cookieParser());

  app.use("/api/auth", createAuthRouter());

  app.get("/_status/healthz", (req: Request, res: Response) => {
    res.status(200).json({
      message: "Server is Healthy",
    });
  });

  app.use(errorMiddleware);

  return app;
}
