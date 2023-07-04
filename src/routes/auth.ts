import { Router, json } from "express";

import { postLogin, postRegister } from "@controllers/auth";
import { validateLogin, validateRegister } from "@middleware/validation/auth";

const router = Router();

router.post("/register", json(), validateRegister, postRegister);

router.post("/login", json(), validateLogin, postLogin);

export default router;
