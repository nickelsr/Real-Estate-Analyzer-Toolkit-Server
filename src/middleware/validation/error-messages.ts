// Reusable error messages for Express-Validator ValidationChains

import { ErrorMessage } from "express-validator/src/base";

export const isStringMessage: ErrorMessage = "Must be a string.";

export const isAlphanumericMessage: ErrorMessage =
  "Must contain only letters and numbers.";

export const isStrongPasswordMessage: ErrorMessage =
  "Must contain at least 8 characters, including at least one " +
  "lowercase letter, one uppercase letter, one number, and one symbol.";

export const isEmailMessage: ErrorMessage = "Must be a valid email.";

export const isObjectMessage: ErrorMessage = "Must be an object.";

export const isEmptyMessage: ErrorMessage = "Must be non-empty.";
