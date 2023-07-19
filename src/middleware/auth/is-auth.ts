import { RequestHandler } from "express";

import { UnauthorizedError } from "@middleware/error";

/**
 * Session cookie authentication middleware.
 *
 * @param req - Express Request
 * @param res - Express Response
 * @param next - Express NextFunction
 */
export const isAuth: RequestHandler = async (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    next(new UnauthorizedError());
  }
};
