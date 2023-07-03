import CONSTANTS from '../config/constants.config.js';
import LoggerService from '../services/logger.service.js';
import CustomError from '../custom/error.custom.js';

export default class ErrorsMiddleware {
  constructor() {
    throw new CustomError({ message: 'Cannot create an instance of a static class' });
  }

  static ErrorHandlerMiddleware(err, req, res, next) {
    const error = err;
    // Render the error JSON.
    if (error.error && error.error.isJoi) {
      error.message = error.error.details[0].message;
      error.status = 400;
    } else if (err.message === CONSTANTS.NOT_FOUND) {
      error.status = 404;
    }
    const errorJSON = {
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
}
