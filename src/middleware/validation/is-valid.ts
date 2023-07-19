import { RequestHandler } from "express";
import { validationResult } from "express-validator";

import { ExpressValidatorError } from "@middleware/error";

/**
 * Validation middleware to pass errors to the custom error handler.
 *
 * @param req - Express Request
 * @param res - Express Result
 * @param next - Express NextFunction
 */
export const isValid: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    next(new ExpressValidatorError(errors.array()));
  } else {
    next();
  }
};
