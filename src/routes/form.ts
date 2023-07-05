import { Router, json } from "express";

import { postFixAndFlip } from "@controllers/form";
import { fixAndFlipValidationRules } from "@middleware/validation/form";

const router = Router();

router.post("/fix-and-flip", json(), fixAndFlipValidationRules, postFixAndFlip);

export default router;
