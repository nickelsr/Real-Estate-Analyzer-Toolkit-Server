import { Router, json } from "express";

import { postFixAndFlip } from "@controllers/form";
import validateFixAndFlip from "@middleware/validation/fix-and-flip";

const router = Router();

router.post("/fix-and-flip", json(), validateFixAndFlip, postFixAndFlip);

export default router;
