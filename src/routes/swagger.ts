import { Router } from "express";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const router = Router();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Real Estate Analyzer Toolkit API",
      version: "1.0.0",
    },
  },
  apis: ["./dist/routes/*.js"],
};
const swaggerSpec = swaggerJSDoc(options);

router.use("/", swaggerUI.serve);
router.get("/", swaggerUI.setup(swaggerSpec));

export default router;
