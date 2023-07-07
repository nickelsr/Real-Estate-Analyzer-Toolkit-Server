import { Router, json } from "express";

import {
  deleteFixAndFlip,
  getFixAndFlip,
  getFixAndFlips,
  createFixAndFlip,
  updateFixAndFlip,
} from "@controllers/form";
import { fixAndFlipValidate } from "@middleware/validation/form";
import isAuth from "@middleware/auth/is-auth";

const router = Router();

router.all("*", isAuth);

router.post("*", json(), fixAndFlipValidate());
router.put("*", json(), fixAndFlipValidate());

router.get("/fix-and-flip/:id", getFixAndFlip);

router.get("/fix-and-flips/", getFixAndFlips);

router.post("/fix-and-flip", createFixAndFlip);

router.put("/fix-and-flip/:id", updateFixAndFlip);

router.delete("/fix-and-flip/:id", deleteFixAndFlip);

export default router;
