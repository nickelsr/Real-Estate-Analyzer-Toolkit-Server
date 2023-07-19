import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import url from "url";

import { Router } from "express";
import swaggerUI from "swagger-ui-express";
import { parse } from "yaml";

const router = Router();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const file = readFileSync(resolve(__dirname, "../swagger/swagger.yaml"), "utf-8");

const swaggerSpec = parse(file);

router.use("/api-docs", swaggerUI.serve);

router.get("/api-docs", swaggerUI.setup(swaggerSpec));

export { router as swaggerRouter };
