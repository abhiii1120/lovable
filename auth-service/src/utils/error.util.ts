import { StatusCodes } from "http-status-codes";
import { AppError } from "../middlewares/error.middleware.js";

/**
 * Represents an unauthorized access error (HTTP 401).
 */
export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized access") {
    super(StatusCodes.UNAUTHORIZED, message);
  }
}
/**
 * Represents an Not Found error (HTTP 404).
 */
export class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(StatusCodes.NOT_FOUND, message);
  }
}

/**
 * Represents an Bad Request error (HTTP 400).
 */
export class BadRequestError extends AppError {
  constructor(message = "All fields are required"){
    super(StatusCodes.BAD_REQUEST,message);
  }
}

/**
 * Represents an Conflict error (HTTP 409).
 */
export class ConflictError extends AppError {
  constructor(message = "Conflict occurs"){
    super(StatusCodes.CONFLICT,message);
  }
}