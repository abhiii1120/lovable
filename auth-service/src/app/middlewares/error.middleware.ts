import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export class AppError extends Error {
  public readonly statusCode: number;

  /**
   * Creates an application error.
   *
   * @param statusCode - HTTP status code to send back to the client.
   * @param message - User-facing error message.
   */
  constructor(statusCode: number, message: string) {
    super(message);
    this.name = new.target.name;
    this.statusCode = statusCode;
  }
}

/**
 * Handles application errors and forwards a safe HTTP response.
 *
 * @param err - The thrown error.
 * @param _req - The incoming request.
 * @param res - The express response object.
 * @param _next - the next midldleware function.
 * @returns
 */
export function errorMiddleware(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      message: err.message,
    });
    return;
  }

  if (err instanceof Error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: err.message || "Internal server error",
    });
    return;
  }

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: "Internal server error",
  });
}
