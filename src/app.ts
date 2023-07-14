import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";

import authRouter from "@routes/auth";
import formRouter from "@routes/form";
import swaggerRouter from "@routes/swagger";
import { errorHandler } from "@middleware/error";

const app = express();

// enable cookie parser
app.use(cookieParser());

// set headers for CORS, allowed methods, and Authentication tokens
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// routers
app.use("/auth", authRouter);
app.use("/form", formRouter);
app.use("/api-docs", swaggerRouter);
app.use(errorHandler);

app.listen({ port: 4000 });
