import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import User from "@db/models/user";
import bcrypt from "bcrypt";

export const postRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() });
  }

  const { username, password, email } = req.body;

  try {
    const encryptedPassword = await bcrypt.hash(password, 12);

    await User.create({
      email,
      username,
      password: encryptedPassword,
    });

    return res.status(201).json({
      message: "Registration completed successfully.",
      submission: {
        email,
        username,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(400).json({
      message: "There was an error completing the user registration.",
    });
  }
};
