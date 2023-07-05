import { ValidationChain, body } from "express-validator";
import { FixAndFlip, isPropertyType, propertyTypes } from "@db/models";
import {
  isEmptyMessage,
  isObjectMessage,
  isStringMessage,
} from "@middleware/validation/error-messages";
import { ErrorMessage } from "express-validator/src/base";

/**
 * Custom validator that verifies street address uniqueness per user.
 *
 * @param value - input value to validate
 * @returns a boolean
 */
const isDuplicateStreetAddress = async (value: string): Promise<boolean> => {
  const address = await FixAndFlip.findOne({
    where: { street_address: value },
  });
  if (address) {
    return Promise.reject();
  }
  return Promise.resolve(true);
};

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

const isDuplicateStreetAddressMessage: ErrorMessage =
  "Duplicate street address. User can only have one Fix-And-Flip entry with " +
  "the same address. Either delete the existing entry and retry, or edit " +
  "the existing entry instead.";

const formattedStateMessage: ErrorMessage =
  "Must be in two letter abbreviated format (e.g., 'NY').";

const formattedZipMessage: ErrorMessage =
  "Must be in ZIP format (e.g., '12345'), or extended ZIP+4 format " +
  "(e.g., '12345-1234').";

const propertyTypeMessage: ErrorMessage =
  "Invalid property type. Must be one of the following: " +
  propertyTypes.join(", ");

const notPosNumberMessage: ErrorMessage = "Must be a positive integer number.";

export const fixAndFlipValidationRules = (): ValidationChain[] => [
  body("property_details").isObject().withMessage(isObjectMessage),
  body("property_details.street_address")
    .isString()
    .withMessage(isStringMessage)
    .escape()
    .trim()
    .notEmpty()
    .withMessage(isEmptyMessage)
    .custom(isDuplicateStreetAddress)
    .withMessage(isDuplicateStreetAddressMessage),
  body("property_details.city")
    .isString()
    .withMessage(isStringMessage)
    .escape()
    .trim()
    .notEmpty()
    .withMessage(isEmptyMessage),
  body("property_details.state")
    .isString()
    .withMessage(isStringMessage)
    .trim()
    .toUpperCase()
    .matches(/^[A-Z]{2}$/)
    .withMessage(formattedStateMessage),
  body("property_details.zip_code")
    .isString()
    .withMessage(isStringMessage)
    .trim()
    .matches(/^\d{5}(-\d{4})?$/)
    .withMessage(formattedZipMessage),
  body("property_details.property_type")
    .optional()
    .isString()
    .withMessage(isStringMessage)
    .customSanitizer(toCapitalCase)
    .custom(isPropertyType)
    .withMessage(propertyTypeMessage),
  body("property_details.num_bedrooms")
    .optional()
    .matches(/^\d+$/)
    .withMessage(notPosNumberMessage),
  body("property_details.num_bathrooms")
    .optional()
    .matches(/^\d+$/)
    .withMessage(notPosNumberMessage),
  body("property_details.square_footage")
    .optional()
    .matches(/^\d+$/)
    .withMessage(notPosNumberMessage),
  body("property_details.year_built")
    .optional()
    .matches(/^\d+$/)
    .withMessage(notPosNumberMessage),
  body("property_details.description")
    .optional()
    .isString()
    .withMessage(isStringMessage)
    .escape(),
  body("estimates").isObject().withMessage(isObjectMessage),
  body("estimates.after_repair_value")
    .matches(/^\d+$/)
    .withMessage(notPosNumberMessage),
  body("estimates.desired_profit")
    .matches(/^\d+$/)
    .withMessage(notPosNumberMessage),
  body("purchase_costs").isObject().withMessage(isObjectMessage),
  body("purchase_costs.purchase_closing_costs")
    .matches(/^\d+$/)
    .withMessage(notPosNumberMessage),
  body("rehab_costs").isObject().withMessage(isObjectMessage),
  body("rehab_costs.repair_costs")
    .matches(/^\d+$/)
    .withMessage(notPosNumberMessage),
  body("rehab_costs.holding_costs")
    .matches(/^\d+$/)
    .withMessage(notPosNumberMessage),
  body("rehab_costs.holding_time_months")
    .matches(/^\d+$/)
    .withMessage(notPosNumberMessage),
  body("sales_costs").isObject().withMessage(isObjectMessage),
  body("sales_costs.agent_commission")
    .optional()
    .matches(/^\d+$/)
    .withMessage(notPosNumberMessage),
  body("sales_costs.sale_closing_costs")
    .matches(/^\d+$/)
    .withMessage(notPosNumberMessage),
];
