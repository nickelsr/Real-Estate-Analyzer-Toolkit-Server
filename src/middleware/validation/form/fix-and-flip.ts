import { ValidationChain, body } from "express-validator";
import { ErrorMessage } from "express-validator/src/base";
import { isPropertyType, propertyTypes } from "@db/models";
import { isEmptyMessage, isStringMessage } from "../error-messages";

/**
 * Custom sanitizer that converts a string to capital case.
 *
 * @param value - input value to sanitize
 * @returns value converted to capital case
 */
const toCapitalCase = (value: string): string => {
  const lowerCaseValue = value.toLowerCase();
  const splitValue = lowerCaseValue.split(" ");

  for (let i = 0; i < splitValue.length; i++) {
    splitValue[i] =
      splitValue[i].charAt(0).toUpperCase() + splitValue[i].slice(1);
  }
  const capitalizedValue = splitValue.join(" ");

  return capitalizedValue;
};

const formattedStateMessage: ErrorMessage =
  "Must be in two letter abbreviated format (e.g., 'NY').";

const formattedZipMessage: ErrorMessage =
  "Must be in ZIP format (e.g., '12345'), or extended ZIP+4 format " +
  "(e.g., '12345-1234').";

const propertyTypeMessage: ErrorMessage =
  "Invalid property type. Must be one of the following: " +
  propertyTypes.join(", ");

const notPosNumberMessage: ErrorMessage = "Must be a positive integer number.";

export const fixAndFlipValidate = (): ValidationChain[] => [
  body("street_address")
    .isString()
    .withMessage(isStringMessage)
    .escape()
    .trim()
    .notEmpty()
    .withMessage(isEmptyMessage),
  body("city")
    .isString()
    .withMessage(isStringMessage)
    .escape()
    .trim()
    .notEmpty()
    .withMessage(isEmptyMessage),
  body("state")
    .isString()
    .withMessage(isStringMessage)
    .trim()
    .toUpperCase()
    .matches(/^[A-Z]{2}$/)
    .withMessage(formattedStateMessage),
  body("zip_code")
    .isString()
    .withMessage(isStringMessage)
    .trim()
    .matches(/^\d{5}(-\d{4})?$/)
    .withMessage(formattedZipMessage),
  body("property_type")
    .optional()
    .isString()
    .withMessage(isStringMessage)
    .customSanitizer(toCapitalCase)
    .custom(isPropertyType)
    .withMessage(propertyTypeMessage),
  body("num_bedrooms")
    .optional()
    .matches(/^\d+$/)
    .withMessage(notPosNumberMessage),
  body("num_bathrooms")
    .optional()
    .matches(/^\d+$/)
    .withMessage(notPosNumberMessage),
  body("square_footage")
    .optional()
    .matches(/^\d+$/)
    .withMessage(notPosNumberMessage),
  body("year_built")
    .optional()
    .matches(/^\d+$/)
    .withMessage(notPosNumberMessage),
  body("description")
    .optional()
    .isString()
    .withMessage(isStringMessage)
    .escape(),
  body("after_repair_value").matches(/^\d+$/).withMessage(notPosNumberMessage),
  body("desired_profit").matches(/^\d+$/).withMessage(notPosNumberMessage),
  body("purchase_closing_costs")
    .matches(/^\d+$/)
    .withMessage(notPosNumberMessage),
  body("repair_costs").matches(/^\d+$/).withMessage(notPosNumberMessage),
  body("holding_costs").matches(/^\d+$/).withMessage(notPosNumberMessage),
  body("holding_time_months").matches(/^\d+$/).withMessage(notPosNumberMessage),
  body("agent_commission")
    .optional()
    .matches(/^\d+$/)
    .withMessage(notPosNumberMessage),
  body("sale_closing_costs").matches(/^\d+$/).withMessage(notPosNumberMessage),
];
