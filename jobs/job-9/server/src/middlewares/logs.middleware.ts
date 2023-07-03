import { Request, Response, NextFunction } from 'express';
import Logger from '../services/logger.service';
import CustomError from '../custom/error.custom';

export default class LogMiddleware {
  private constructor() {
    throw new CustomError({ message: 'Cannot create an instance of a static class' });
  }

  /**
   * Log handler middleware.
   *
   * Log each incoming request to the server.
   * @param {Request} req - A request object with the body and parameters.
   * @param {Response} res - A response object to return JSON.
   * @param {NextFunction} next - The next middleware function in the chain.
   * @returns {void}
   */
  static log(req: Request, res: Response, next: NextFunction): void {
    const fieldsToLog: Array<keyof Request> = ['body', 'query', 'params', 'headers', 'cookies'];
    const { method, originalUrl } = req;
    let info = `Request: ${method} | ${originalUrl}`;
    for (let i = 0; i < fieldsToLog.length; i += 1) {
      const field = fieldsToLog[i];
      if (Object.keys(req[field]).length) {
        info += ` | ${String(field)}: ${JSON.stringify(req[field])}`;
      }
      info = info.trim();
    }
    Logger.info(info);
    return next();
  }
}
