import express, { NextFunction, Request, Response } from "express";

import sequelize from "@db/connection";
import { authRouter, formRouter, swaggerRouter, userRouter } from "@routes";
import { sessionMiddleware } from "@middleware/session";
import { errorHandler } from "@middleware/error";

const app = express();

app.set("trust proxy", 1);
app.use(sessionMiddleware);

// TODO: Manually set up tables instead of sync before commit
sequelize.sync({ force: true });

// Set headers for allowed methods
app.use((req: Request, res: Response, next: NextFunction) => {
  res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

// Routers
app.use(authRouter);
app.use(userRouter);
app.use("/form", formRouter);
app.use(swaggerRouter);

// Error handling middleware
app.use(errorHandler);

app.listen({ port: 4000 });
