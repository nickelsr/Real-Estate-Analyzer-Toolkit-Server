import express from "express";
import cookieParser from "cookie-parser";

import authRouter from "@routes/auth";
import formRouter from "@routes/form";

const app = express();

// middleware
app.use(cookieParser());

// routers
app.use("/auth", authRouter);
app.use("/form", formRouter);

// TODO: create standard error handler route below to catch errors

app.listen({ port: 4000 });
