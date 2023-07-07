import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "@db/models";
import { jwtSecretKey } from "util/jwt-secret";

export const postLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email: email } });
    if (user === null) {
      return res.status(404).json({ message: "Email not found." });
    }
    const userData = user.get();

    const match = await bcrypt.compare(password, userData.password);
    if (!match) {
      return res.status(401).json({ message: "Incorrect password." });
    }

    const token = jwt.sign(
      {
        userId: userData.id,
        email: email,
      },
      jwtSecretKey,
      {
        expiresIn: "10m",
      }
    );

    return res.status(200).json({ token: token, userId: userData.id });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(400).json({ message: "There was an error logging in." });
  }
};
