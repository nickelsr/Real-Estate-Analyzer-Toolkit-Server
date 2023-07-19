import { ValidationChain, param } from "express-validator";

import { getMessage } from "./get-message";

/**
 * Validation for the /user:id (GET) endpoint
 */
export const getUserByIdValidationChain = (): ValidationChain[] => {
  return [param("id").isInt({ min: 1, max: 2147483647 }).withMessage(getMessage("uInt32"))];
};
