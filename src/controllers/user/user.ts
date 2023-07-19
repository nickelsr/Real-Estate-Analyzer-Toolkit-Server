import { RequestHandler } from "express";
import { validationResult } from "express-validator";

import User from "@db/models/user";
import { ExpressValidatorError, ForbiddenError, NotFoundError, ServerError } from "@middleware/error";

/**
 * Get a User by ID.
 *
 * @param req - Express Request
 * @param res - Express Response
 * @param next - Express NextFunction
 */
export const getUser: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new ExpressValidatorError(errors.array())); // invalid param
  }

  const { id } = req.params;

  let user;

  try {
    user = await User.findByPk(id);
  } catch (err) {
    return next(new ServerError()); // database operation failure
  }

  if (!user) {
    return next(new NotFoundError()); // endpoint does not exist
  }

  const { hashedPassword, ...userData } = user.toJSON();

  if (userData.id !== req.session.userId) {
    return next(new ForbiddenError()); // logged in user is not the user being fetched
  }

  res.status(201).json({ success: true, data: userData });
};
