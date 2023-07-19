import { RequestHandler } from "express";
import bcrypt from "bcrypt";

import { User } from "@db/models";
import { ConflictError, NotFoundError, UnauthorizedError, ServerError } from "@middleware/error";

/**
 * Register a new User.
 *
 * @param req - Express Request
 * @param res - Express Response
 * @param next - Express NextFunction
 */
export const postRegister: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  let conflictingUser;

  try {
    conflictingUser = await User.findOne({ where: { email: email } });
  } catch (err) {
    return next(new ServerError());
  }

  if (conflictingUser) {
    return next(new ConflictError("Email in use."));
  }

  let hashedPassword: string;

  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return next(new ServerError());
  }

  const user = User.build({ email, hashedPassword });

  try {
    await user.save();
  } catch (err) {
    return next(new ServerError());
  }

  const { hashedPassword: _, ...userReadProps } = user.toJSON();

  res.status(201).json({ success: true, data: userReadProps });
};

/**
 * Log in to a User account.
 *
 * @param req - Express Request
 * @param res - Express Response
 * @param next - Express NextFunction
 */
export const postLogin: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  let user;

  try {
    user = await User.findOne({ where: { email: email } });
  } catch (err) {
    return next(new ServerError());
  }

  if (!user) {
    return next(new NotFoundError("User email not found."));
  }

  const userData = user.get();

  let match: boolean;

  try {
    match = await bcrypt.compare(password, userData.hashedPassword);
  } catch (err) {
    return next(new ServerError("Error verifying password."));
  }

  if (!match) {
    return next(new UnauthorizedError("Invalid password."));
  }

  req.session.regenerate(err => {
    if (err) {
      return next(new ServerError("Error regenerating session."));
    }

    req.session.userId = userData.id;

    req.session.save(err => {
      if (err) {
        return next(new ServerError("Error saving session."));
      }
    });

    return res.status(200).json({ success: true, message: "Login successful. Session cookie returned." });
  });
};
