import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { UnauthorizedError } from "../utils/error.util.js";

export type AuthenticatedUser = {
  id: string;
  email: string;
  name: string;
};

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

/**
 * Verifies a bearer access token and attaches the authenticated user.
 * 
 * @param req - Incoming request object.
 * @param _res - Express response object.
 * @param next - Next middleware callback.
 */
export function authenticate(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new UnauthorizedError("Missing Authorization Header.");
  }

  const [schema, token] = authHeader.split(" ");

  if (schema !== "Bearer" || !token) {
    throw new UnauthorizedError(
      "Invalid Authorization header.Expected: Bearer <token>",
    );
  }

  try {
    const decoded = jwt.verify(token, env.ACCESS_TOKEN_SECRET) as {
      sub?: string;
      email?: string;
      name?: string;
    };

    if (!decoded.sub || !decoded.email || !decoded.name) {
      throw new Error("Missing token claims");
    }

    req.user = {
      id: decoded.sub,
      email: decoded.email,
      name: decoded.name,
    };

    next();
  } catch (error) {
    throw new UnauthorizedError("Invalid or exprired access Token.");
  }
}
