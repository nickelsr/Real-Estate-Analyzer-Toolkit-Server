import { propertyTypes } from "@db/models/fix-and-flip";

type Messages = {
  str: string;
  uInt32: string;
  alnum: string;
  password: string;
  email: string;
  empty: string;
  stateFormat: string;
  zipFormat: string;
  propertyType: string;
};

const messages: Messages = {
  str: "Must be a string.",
  uInt32: "Must be a positive integer no greater than 2147483647",
  alnum: "Must contain only letters and numbers.",
  password: "Must contain at least 8 characters, including at least one lowercase letter, uppercase letter, number, and special character.",
  email: "Must be a valid email.",
  empty: "Must be non-empty.",
  stateFormat: "Must be in two letter abbreviated format (e.g., 'NY' or 'CA').",
  zipFormat: "Must be in ZIP format (e.g., '12345'), or extended ZIP+4 format (e.g., '12345-1234').",
  propertyType: "Invalid property type. Must be one of the following: " + propertyTypes.join(", "),
};

/**
 * Getter for custom express-validator messages
 *
 * @param msgId - key of message relating to failed validator
 * @returns  error message
 */
export const getMessage = (msgId: keyof Messages): string => {
  return messages[msgId];
};
