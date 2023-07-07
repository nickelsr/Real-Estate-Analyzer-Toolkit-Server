import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { jwtSecretKey } from "util/jwt-secret";

const isJwtPayload = (token: string | JwtPayload): token is JwtPayload => {
  return typeof token !== "string";
};

const isAuth = (req: Request, res: Response, next: NextFunction) => {
  // expects Authorization value to be "Bearer <jwt>"
  const token = req.get("Authorization")?.split(" ")[1];
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Authorization token missing." });
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, jwtSecretKey);
  } catch (error) {
    return res.status(500).json({
      message: "Error verifying Authorization token.",
    });
  }
  if (!decodedToken) {
    return res.status(401).json({ message: "Incorrect Authorization token." });
  }
  if (!isJwtPayload(decodedToken)) {
    return res.status(400).json({ message: "JWT failed to decode." });
  }

  res.locals.userId = decodedToken.userId;
  next();
};

export default isAuth;
