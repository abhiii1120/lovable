import type { Request, Response, NextFunction, RequestHandler } from "express";
import type qs from "qs";

export const asyncHandler = <
  P = Record<string, string>,
  ResBody = any,
  ReqBody = any,
  ReqQuery = qs.ParsedQs,
>(
  handler: (
    req: Request<P, ResBody, ReqBody, ReqQuery>,
    res: Response<ResBody>,
    next: NextFunction,
  ) => Promise<unknown>,
): RequestHandler<P, ResBody, ReqBody, ReqQuery> => {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};