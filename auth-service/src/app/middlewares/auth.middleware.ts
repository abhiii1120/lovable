import type { NextFunction, request, response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";

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
