// Reusable Express-Validator ValidationChains used for multiple routes

import {
  isAlphanumericMessage,
  isEmailMessage,
  isStringMessage,
} from "@middleware/validation/error-messages";
import { ValidationChain, body } from "express-validator";

/**
 * Validation: is string, is email.
 * Sanitization: trim, normalize.
 */
export const emailValidationChain = (): ValidationChain =>
  body("email")
    .isString()
    .withMessage(isStringMessage)
    .isEmail()
    .withMessage(isEmailMessage)
    .trim()
    .normalizeEmail({
      gmail_lowercase: true,
      gmail_remove_subaddress: true,
      outlookdotcom_lowercase: true,
      outlookdotcom_remove_subaddress: true,
      yahoo_lowercase: true,
      yahoo_remove_subaddress: true,
      icloud_lowercase: true,
      icloud_remove_subaddress: true,
    });

/**
 * Validation: isString.
 * Sanitization: trim, isAlphanumeric.
 * Options: bail.
 */
export const usernameValidationChain = (): ValidationChain =>
  body("username")
    .isString()
    .withMessage(isStringMessage)
    .isAlphanumeric()
    .withMessage(isAlphanumericMessage)
    .trim()
    .toLowerCase()
    .bail();

/**
 * Validation: isString.
 */
export const passwordValidationChain = (): ValidationChain =>
  body("password").isString().withMessage(isStringMessage);
