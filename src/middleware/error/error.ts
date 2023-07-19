import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { Location, ValidationError } from "express-validator";

/**
 * Error expected by error handler
 */
interface ErrorInterface {
  success: boolean;
  statusCode: number;
  message?: string;
  validationErrors?: ValidationError[];
}

/**
 * ValidationErrors responses
 */
interface ValidationErrorResponse {
  /**
   * Name of the field that failed validation
   */
  name?: string;

  /**
   * Part of request the field is located in.
   * body, cookies, headers, params, or query
   */
  location?: Location;

  /**
   * Summary of the reason for failure
   */
  reason?: string;
}

/**
 * Shape of response sent by error handler
 */
interface ErrorResponse {
  success: boolean;
  statusCode: number;
  msg?: string;
  validationErrors?: ValidationErrorResponse[];
}

/**
 * Base Error that all errors inherit from
 */
abstract class BaseError extends Error implements ErrorInterface {
  abstract statusCode: number;
  success: boolean = false;
  msg?: string;

  constructor(msg?: string) {
    super();
    this.msg = msg;
  }
}

/**
 * Error related to user request
 */
abstract class ClientError extends BaseError {}

/**
 * Error related to server operations
 */
export class ServerError extends BaseError {
  statusCode = 500;
}

/**
 * Error caused by a bad user request
 */
export class BadRequestError extends ClientError {
  statusCode = 400;
}

/**
 * Error caused by unauthorized user request (invalid credentials)
 */
export class UnauthorizedError extends ClientError {
  statusCode = 401;
}

/**
 * Error caused by unauthorized user request (valid credentials with invalid access rights)
 */
export class ForbiddenError extends ClientError {
  statusCode = 403;
}

/**
 * Error caused by user request for a resource that doesn't exist
 */
export class NotFoundError extends ClientError {
  statusCode = 404;
}

/**
 * Error caused by a bad user request
 */
export class ConflictError extends ClientError {
  statusCode = 409;
}

/**
 * Error caused by validation errors from express-validator
 */
export class ExpressValidatorError extends BadRequestError {
  validationErrors: ValidationError[];

  constructor(validationErrors: ValidationError[]) {
    super("Your request failed validation.");
    this.validationErrors = validationErrors;
  }
}

/**
 * Express error handling middleware for sending standardized http responses.
 *
 * @param err - Error
 * @param req - Express#Request
 * @param res - Express#Response
 * @param next - Express#NextFunction
 */
export const errorHandler: ErrorRequestHandler = (err: ErrorInterface, req: Request, res: Response, next: NextFunction) => {
  // If headers have already been sent to the client, delegate to the default Express error handler
  if (res.headersSent) {
    return next(err);
  }

  const { success, statusCode, message, validationErrors } = err;

  if (!message && !validationErrors) {
    return res.sendStatus(statusCode);
  }

  res.type("application/json; charset=utf-8");
  res.status(err.statusCode);

  const expressValidatorErrors: ValidationErrorResponse[] = [];

  if (validationErrors) {
    for (const validationError of Object.values(validationErrors)) {
      const validationErrorResponse: ValidationErrorResponse = {
        ...(validationError.type === "field" && { name: validationError.path }),
        ...(validationError.type === "field" && {
          location: validationError.location,
        }),
        reason: validationError.msg,
      };

      expressValidatorErrors.push(validationErrorResponse);
    }
  }

  const errorResponse: ErrorResponse = {
    success,
    statusCode,
    ...(message && { message: message }),
    ...(expressValidatorErrors.length && {
      validationErrors: expressValidatorErrors,
    }),
  };

  res.json(errorResponse);
};
