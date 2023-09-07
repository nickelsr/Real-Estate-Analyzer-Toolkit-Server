import session from "express-session";
import ConnectSessionSequelize from "connect-session-sequelize";

import sequelize from "@db/connection";
import { privateKey } from "@util/jwt-secret";

declare module "express-session" {
  interface SessionData {
    userId: number;
  }
}

const SessionStore = ConnectSessionSequelize(session.Store);

export const sessionMiddleware = session({
  name: "id",
  cookie: {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    domain: process.env.NODE_ENV === "production" ? "analyzetk.com" : "localhost",
    maxAge: 1000 * 60 * 60 * 24 * 30, // ms * sec * min * hr * days. 30 days total
  },
  resave: false,
  saveUninitialized: false,
  secret: privateKey,
  store: new SessionStore({
    db: sequelize,
  }),
});
