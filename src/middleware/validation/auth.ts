import { getMessage } from "./get-message";
import { ValidationChain, body } from "express-validator";

/**
 * Validate and sanitize email
 */
const emailValidationChain = (): ValidationChain => {
  const emailOptions = {
    gmail_lowercase: true,
    gmail_remove_subaddress: true,
    outlookdotcom_lowercase: true,
    outlookdotcom_remove_subaddress: true,
    yahoo_lowercase: true,
    yahoo_remove_subaddress: true,
    icloud_lowercase: true,
    icloud_remove_subaddress: true,
  };

  return body("email").isEmail().withMessage(getMessage("email")).trim().normalizeEmail(emailOptions);
};

/**
 * Validate and sanitize username
 */
const usernameValidationChain = (): ValidationChain => {
  const alnumMsg = getMessage("alnum");

  return body("username").isAlphanumeric().withMessage(alnumMsg).trim().toLowerCase().bail();
};

/**
 * Validate password.
 */
const passwordValidationChain = (): ValidationChain => {
  const passwordMsg = getMessage("password");

  return body("password").isString().withMessage(passwordMsg);
};

/**
 * Validation for the /login endpoint
 */
export const postLoginValidationChain = (): ValidationChain[] => {
  return [emailValidationChain(), passwordValidationChain()];
};

/**
 * Validation for the /register endpoint
 */
export const postRegisterValidationChain = (): ValidationChain[] => {
  const passwordOptions = { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 };

  return [emailValidationChain(), passwordValidationChain().isStrongPassword(passwordOptions).withMessage(getMessage("password"))];
};
