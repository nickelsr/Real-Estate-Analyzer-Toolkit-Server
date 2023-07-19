import { Router } from "express";

import { getUserByIdValidationChain, isValid } from "@middleware/validation";
import { isAuth } from "@middleware/auth";
import { getUser } from "@controllers/user";

const router = Router();

router.get("/user/:id", isAuth, getUserByIdValidationChain(), isValid, getUser);

export { router as userRouter };
