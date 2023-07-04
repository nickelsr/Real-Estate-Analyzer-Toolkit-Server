import { Schema, checkSchema } from "express-validator";
import { FixAndFlip } from "@db/models";

const propertyTypes = [
  "Single Family Home",
  "Townhouse",
  "Duplex",
  "Condo",
  "Apartment",
  "Other",
];

/**
 * Custom validator that verifies acceptable property types.
 *
 * @param value - input value to validate.
 */
const isValidPropertyType = (value: string): boolean => {
  return propertyTypes.includes(value);
};

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

const schema: Schema = {
  "property_details": {
    isObject: {
      errorMessage: "Must be an object.",
    },
  },
  "property_details.street_address": {
    isString: {
      errorMessage: "Must be a string.",
    },
    escape: true,
    trim: true,
    notEmpty: {
      errorMessage: "Must be non-empty.",
    },
    custom: {
      options: isDuplicateStreetAddress,
      errorMessage:
        "Duplicate street address. User can only have one Fix-And-Flip " +
        "entry with the same address. Either delete the existing entry and " +
        "retry, or edit the existing entry instead.",
    },
  },
  "property_details.city": {
    isString: {
      errorMessage: "Must be a string.",
    },
    escape: true,
    trim: true,
    notEmpty: {
      errorMessage: "Must be non-empty.",
    },
  },
  "property_details.state": {
    isString: {
      errorMessage: "Must be a string.",
    },
    trim: true,
    toUpperCase: true,
    matches: {
      options: /^[A-Z]{2}$/,
      errorMessage: "Must be in two letter abbreviated format (e.g., 'NY').",
    },
  },
  "property_details.zip_code": {
    isString: {
      errorMessage: "Must be a string.",
    },
    trim: true,
    matches: {
      options: /^\d{5}(-\d{4})?$/,
      errorMessage:
        "Must be in ZIP format (e.g., '12345'), or extended ZIP+4 format " +
        "(e.g., '12345-1234').",
    },
  },
  "property_details.property_type": {
    optional: true,
    isString: {
      errorMessage: "Must be a string.",
    },
    customSanitizer: {
      options: toCapitalCase,
    },
    custom: {
      options: isValidPropertyType,
      errorMessage:
        "Invalid property type. Must be one of the following: " +
        propertyTypes.join(", "),
    },
  },
  "property_details.num_bedrooms": {
    optional: true,
    matches: {
      options: /^\d+$/,
      errorMessage: "Must be a positive integer number.",
    },
  },
  "property_details.num_bathrooms": {
    optional: true,
    matches: {
      options: /^\d+$/,
      errorMessage: "Must be a positive integer number.",
    },
  },
  "property_details.square_footage": {
    optional: true,
    matches: {
      options: /^\d+$/,
      errorMessage: "Must be a positive integer number.",
    },
  },
  "property_details.year_built": {
    optional: true,
    matches: {
      options: /^\d+$/,
      errorMessage: "Must be a positive integer.",
    },
  },
  "property_details.description": {
    optional: true,
    isString: {
      errorMessage: "Must be a string.",
    },
    escape: true,
  },
  "estimates": {
    isObject: {
      errorMessage: "Must be an object.",
    },
  },
  "estimates.after_repair_value": {
    matches: {
      options: /^\d+$/,
      errorMessage: "Must be a positive integer.",
    },
  },
  "estimates.desired_profit": {
    matches: {
      options: /^\d+$/,
      errorMessage: "Must be a positive integer.",
    },
  },
  "purchase_costs": {
    isObject: {
      errorMessage: "Must be an object.",
    },
  },
  "purchase_costs.purchase_closing_costs": {
    matches: {
      options: /^\d+$/,
      errorMessage: "Must be a positive integer.",
    },
  },
  "rehab_costs": {
    isObject: {
      errorMessage: "Must be an object.",
    },
  },
  "rehab_costs.repair_costs": {
    matches: {
      options: /^\d+$/,
      errorMessage: "Must be a positive integer.",
    },
  },
  "rehab_costs.holding_costs": {
    matches: {
      options: /^\d+$/,
      errorMessage: "Must be a positive integer.",
    },
  },
  "rehab_costs.holding_time_months": {
    matches: {
      options: /^\d+$/,
      errorMessage: "Must be a positive integer.",
    },
  },
  "sales_costs": {
    isObject: {
      errorMessage: "Must be an object.",
    },
  },
  "sales_costs.agent_commission": {
    optional: true,
    matches: {
      options: /^\d+$/,
      errorMessage: "Must be a positive integer.",
    },
  },
  "sales_costs.sale_closing_costs": {
    matches: {
      options: /^\d+$/,
      errorMessage: "Must be a positive integer.",
    },
  },
};

const validate = checkSchema(schema, ["body"]);

export default validate;
