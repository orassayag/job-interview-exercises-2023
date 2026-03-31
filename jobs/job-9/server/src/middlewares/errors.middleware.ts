import { Request, Response, NextFunction } from 'express';
import LoggerService from '../services/logger.service';
import CustomError from '../custom/error.custom';
import CONSTANTS from '../config/constants.config';

interface CustomLocalError extends Error {
  status?: number;
  message: string;
  timestamp?: string;
  errorValue?: any;
  stack?: string;
  error?: any;
}

export default class ErrorHandlerMiddleware {
  static ErrorHandlerMiddleware(
    err: CustomLocalError,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    const error: CustomLocalError = err;
    // Render the error JSON.
    if (error.error && error.error.isJoi) {
      error.message = error.error.details[0].message;
      error.status = 400;
    } else if (err.message === CONSTANTS.NOT_FOUND) {
      error.status = 404;
    }
    const errorJSON: {
      status: number;
      message: string;
      timestamp?: string;
      invalidValue?: any;
    } = {
      status: error.status || 500,
      message: error.message,
    };
    if (error.timestamp) {
      errorJSON.timestamp = error.timestamp;
    }
    LoggerService.error(error);
    if (error.errorValue) {
      errorJSON.invalidValue = error.errorValue;
    }
    if (error.stack) {
      console.log(error.stack);
    }
    res.status(errorJSON.status).send(errorJSON);
    return next();
  }

  /**
   * Page not found handler middleware.
   *
   * Handle default errors on any error on the express app.
   * @param {object} req - The request object.
   * @param {object} res - A response object to return JSON.
   * @param {object} next - The next middleware function in the chain.
   * @returns {void}
   */
  static PageNotFoundHandlerMiddleware(req: Request, res: Response, next: NextFunction): void {
    return next(
      new CustomError({ message: `Page not found: ${req.path} via: ${req.method}`, status: 404 })
    );
  }
}
