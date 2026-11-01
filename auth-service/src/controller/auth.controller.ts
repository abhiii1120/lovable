import bcrypt from "bcryptjs";
import type { NextFunction, Request, Response } from "express";
import jwt, { type Secret, type SignOptions } from "jsonwebtoken";

import { env } from "../config/env.js";
import type { AuthTokenPayload, RegisterRequestBody } from "../types/user.js";
import { BadRequestError, ConflictError } from "../utils/error.util.js";
import { getRefreshTokenCookieOptions } from "../utils/token.util.js";
import { BuildSuccessResponse } from "../utils/BuildSuccessReponse.js";
import { createUser, findUserByEmail } from "../dao/user.dao.js";

const SALT_ROUNDS = 10;

/**
 * Signs a JWT with a typed secret and expiry value.
 *
 * @param payload - JWT payload to sign.
 * @param secret - Secret used to sign the token.
 * @param expiresIn - Time-to-live string value.
 * @returns Signed JWT string.
 */
function signToken(
  payload: AuthTokenPayload,
  secret: Secret,
  expiresIn: string,
): string {
  return jwt.sign(payload, secret, {
    expiresIn: expiresIn as SignOptions["expiresIn"],
  });
}

/**
 * Validate a trimmed email string with a simple format check.
 *
 * @param value - Raw value to validate.
 * @returns True when the value is a valid email address.
 */
function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/**
 * Validates a required string fields.
 *
 * @param value -Input value to validate.
 * @param fieldName - Field name used for errors.
 * @returns A trimmed string or throws an error.
 */
function validateRequiredString(value: unknown, fieldName: string): string {
  if (typeof value !== "string") {
    throw new BadRequestError(`${fieldName} is Required`);
  }

  const trimmed = value.trim();

  if (!trimmed) {
    throw new BadRequestError(`${fieldName} is Required`);
  }

  return trimmed;
}

/**
 * generates accessToken and refreshtoken for given user details.
 *
 * @param user - Authenticated user payload.
 * @returns accessToken and refreshToken.
 */
function signTokens(user: { id: string; email: string; name: string }): {
  accessToken: string;
  refreshToken: string;
} {
  let tokenVal = {
    sub: user.id,
    email: user.email,
    name: user.name,
  };
  let accessToken = signToken(
    tokenVal,
    env.ACCESS_TOKEN_SECRET,
    env.ACCESS_TOKEN_EXPIRY,
  );

  let refreshToken = signToken(
    tokenVal,
    env.REFRESH_TOKEN_SECRET,
    env.REFRESH_TOKEN_EXPIRY,
  );

  return { accessToken, refreshToken };
}

/**
 * Builds a response payload with access and refresh tokens for auth responses.
 *
 * @param res - Express response instance.
 * @param user - Authenticated user payload.
 */
function issueTokens(
  res: Response,
  user: { id: string; email: string; name: string },
): void {
  const { accessToken, refreshToken } = signTokens(user);
      // await setRefreshTokenHash(safeUser.id, bcrypt.hashSync(refreshToken, SALT_ROUNDS));
  res.setHeader("Authorization", `Bearer ${accessToken}`);
  res.cookie("refreshToken", refreshToken, getRefreshTokenCookieOptions());

  BuildSuccessResponse(res, "OK", {
    UserData: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
}

export async function register(
  req: Request<{},{},RegisterRequestBody>,
  res:Response,
  next:NextFunction,
):Promise<void> {
  const name = validateRequiredString(req.body?.name,"name");
  const email = validateRequiredString(req.body?.email,"email");
  const password = validateRequiredString(req.body?.password,"password");

  if(name.length < 2){
    throw new BadRequestError("name must be at least 2 character long.");
  }

  if(!isValidEmail(email)){
    throw new BadRequestError("Invalid email format.");
  }

  if(password.length < 8){
    throw new BadRequestError("password must be at least 8 characters long.");
  }

  const existingUser = await findUserByEmail(email);
  if(existingUser){
    throw new ConflictError("Email already registered");
  }

  const passwordHash = await bcrypt.hash(password,SALT_ROUNDS);
  const user = await createUser({
    name,
    email:email.toLowerCase(),
    passwordHash,
  });

  const safeUser = {
    id:user?._id.toString(),
    name:user?.name,
    email:user?.email,
  }


}