import { ContextRunner, ValidationChain, body, checkExact, param } from "express-validator";

import { isPropertyType } from "@db/models";
import { getMessage } from "./get-message";
import { Middleware } from "express-validator/src/base";

/**
 * Custom sanitizer that converts a string to capital case.
 *
 * @param value - input value to sanitize
 * @returns value converted to capital case
 */
const toCapitalCase = (value: string): string => {
  const lowerCaseString = value.toLowerCase();
  const lowerCaseTokens = lowerCaseString.split(" ");

  const capitalCaseTokens: string[] = [];

  for (const tok of lowerCaseTokens) {
    const capitalCaseToken = tok.charAt(0).toUpperCase() + tok.slice(1);
    capitalCaseTokens.push(capitalCaseToken);
  }

  const capitalCaseString = capitalCaseTokens.join(" ");

  return capitalCaseString;
};

/**
 * Generates request body validation rules for fix-and-flip endpoints.
 *
 * @returns  ValidationChain[]
 */
const bodyValidationChain = (): ValidationChain[] => {
  const isIntOptions = { min: 1, max: 2147483647 };
  const stateRegex = /^[A-Z]{2}$/;
  const zipCodeRegex = /^\d{5}(-\d{4})?$/;
  const intMsg = getMessage("uInt32");
  const propertyMsg = getMessage("propertyType");
  const stateFormatMsg = getMessage("stateFormat");
  const zipFormatMsg = getMessage("zipFormat");
  const emptyMsg = getMessage("empty");

  return [
    body("street_address").escape().trim().notEmpty().withMessage(emptyMsg),
    body("city").escape().trim().notEmpty().withMessage(emptyMsg),
    body("state").escape().trim().toUpperCase().matches(stateRegex).withMessage(stateFormatMsg),
    body("zip_code").escape().trim().matches(zipCodeRegex).withMessage(zipFormatMsg),
    body("property_type").optional().escape().customSanitizer(toCapitalCase).custom(isPropertyType).withMessage(propertyMsg),
    body("num_bedrooms").optional().isInt(isIntOptions).withMessage(intMsg),
    body("num_bathrooms").optional().isInt(isIntOptions).withMessage(intMsg),
    body("square_footage").optional().isInt(isIntOptions).withMessage(intMsg),
    body("year_built").optional().isInt(isIntOptions).withMessage(intMsg),
    body("description").optional().escape(),
    body("after_repair_value").isInt(isIntOptions).withMessage(intMsg),
    body("desired_profit").isInt(isIntOptions).withMessage(intMsg),
    body("purchase_closing_costs").isInt(isIntOptions).withMessage(intMsg),
    body("repair_costs").isInt(isIntOptions).withMessage(intMsg),
    body("holding_costs").isInt(isIntOptions).withMessage(intMsg),
    body("holding_time_months").isInt(isIntOptions).withMessage(intMsg),
    body("agent_commission").optional().isInt(isIntOptions).withMessage(intMsg),
    body("sale_closing_costs").isInt(isIntOptions).withMessage(intMsg),
  ];
};

/**
 * Generates request param validation rules for fix-and-flip endpoints.
 *
 * @returns  ValidationChain[]
 */
const paramValidationChain = (): ValidationChain[] => {
  return [param("id").isInt({ min: 1, max: 2147483647 }).withMessage(getMessage("uInt32"))];
};

/**
 * Generates validation rules for /form/fix-and-flip/:id (GET) endpoint.
 *
 * @returns  ValidationChain[]
 */
export const getFixAndFlipRules = (): ValidationChain[] => {
  const validationChain: ValidationChain[] = [];
  validationChain.push(...paramValidationChain());
  return validationChain;
};

/**
 * Generates validation rules for /form/fix-and-flip/:id (DELETE) endpoint.
 *
 * @returns  ValidationChain[]
 */
export const deleteFixAndFlipRules = (): ValidationChain[] => {
  const validationChain: ValidationChain[] = [];
  validationChain.push(...paramValidationChain());
  return validationChain;
};

/**
 * Generates validation rules for /form/fix-and-flip/:id (PUT) endpoint.
 *
 * @returns  Middleware & ContextRunner
 */
export const putFixAndFlipRules = (): Middleware & ContextRunner => {
  const validationChain: ValidationChain[] = [];
  validationChain.push(...bodyValidationChain());
  validationChain.push(...paramValidationChain());
  return checkExact(validationChain);
};

/**
 * Generates validation rules for /form/fix-and-flip (POST) endpoint.
 *
 * @returns  Middleware & ContextRunner
 */
export const postFixAndFlipRules = (): Middleware & ContextRunner => {
  const validationChain: ValidationChain[] = [];
  validationChain.push(...bodyValidationChain());
  return checkExact(validationChain);
};
