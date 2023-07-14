import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ValidationError } from "express-validator";

/**
 * Shape of error expected by error handler
 */
interface ErrorInterface {
  statusCode: number;
  message: string;
  validationErrors?: ValidationError[];
  cause?: unknown;
}

/**
 * Shape of response sent by error handler
 */
interface ResponseBody {
  message: string;
  validationErrors?: ValidationError[];
  cause?: unknown;
}

/**
 * Base Error that all errors inherit from
 */
abstract class BaseError extends Error implements ErrorInterface {
  abstract statusCode: number;

  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
  }
}

/**
 * Error related to user request
 */
abstract class ClientError extends BaseError {}

/**
 * Error related to server request handling
 */
export class ServerError extends BaseError {
  statusCode = 500;
}

/**
 * Error related to database operations
 */
export class DatabaseError extends ServerError {
  constructor(options?: ErrorOptions) {
    super("Error accessing database.", options);
  }
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
 * Error caused by validation errors from express-validator
 */
export class ExpressValidatorError extends BadRequestError {
  validationErrors: ValidationError[];

  constructor(validationErrors: ValidationError[], options?: ErrorOptions) {
    super("Error validating request input.", options);
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
 * @returns void
 */
export const errorHandler: ErrorRequestHandler = (
  err: ErrorInterface,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // If headers have already been sent to the client, delegate to the default Express error handler
  if (res.headersSent) {
    return next(err);
  }

  const responseBody: ResponseBody = {
    message: err.message,
    ...(err.cause !== undefined && { cause: err.cause }),
    ...(err.validationErrors && { validationErrors: err.validationErrors }),
  };

  return res.status(err.statusCode).json(responseBody);
};
