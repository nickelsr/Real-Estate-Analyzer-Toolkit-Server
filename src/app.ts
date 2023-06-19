import express from "express";
import cookieParser from "cookie-parser";

import formRouter from "@routes/form";

const app = express();

// middleware
app.use(cookieParser());

// routers
app.use(formRouter);

// TODO: create standard error handler route below to catch errors

app.listen({ port: 4000 });
