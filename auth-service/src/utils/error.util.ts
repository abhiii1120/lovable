import { StatusCodes } from "http-status-codes";
import { AppError } from "../middlewares/error.middleware.js";

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized access") {
    super(StatusCodes.UNAUTHORIZED, message);
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(StatusCodes.NOT_FOUND, message);
  }
}
