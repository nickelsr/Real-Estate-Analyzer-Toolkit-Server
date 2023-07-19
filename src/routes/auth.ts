import { Router, json } from "express";

import { postLogin, postRegister } from "@controllers/auth";
import { postLoginValidationChain, postRegisterValidationChain, isValid } from "@middleware/validation";

const router = Router();

router.post("/login", json(), postLoginValidationChain(), isValid, postLogin);

router.post("/register", json(), postRegisterValidationChain(), isValid, postRegister);

export { router as authRouter };
