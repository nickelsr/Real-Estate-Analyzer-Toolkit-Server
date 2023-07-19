import { Router, json } from "express";

import { deleteFixAndFlip, getFixAndFlip, getFixAndFlips, createFixAndFlip, updateFixAndFlip } from "@controllers/form";
import { deleteFixAndFlipRules, getFixAndFlipRules, postFixAndFlipRules, putFixAndFlipRules, isValid } from "@middleware/validation";
import { isAuth } from "@middleware/auth";

const router = Router();

router.get("/fix-and-flip/:id", isAuth, getFixAndFlipRules(), isValid, getFixAndFlip);

router.put("/fix-and-flip/:id", isAuth, json(), putFixAndFlipRules(), isValid, updateFixAndFlip);

router.delete("/fix-and-flip/:id", isAuth, deleteFixAndFlipRules(), isValid, deleteFixAndFlip);

router.post("/fix-and-flip", isAuth, json(), postFixAndFlipRules(), isValid, createFixAndFlip);

router.get("/fix-and-flips/", isAuth, getFixAndFlips);

export { router as formRouter };
