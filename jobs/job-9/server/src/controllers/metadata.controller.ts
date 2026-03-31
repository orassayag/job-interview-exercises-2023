import { Request, Response, NextFunction } from 'express';
import MetadataModel from '../models/metadata.model';
import CustomError from '../custom/error.custom';

export default class MetadataController {
  private constructor() {
    throw new CustomError({
      message: 'Cannot create an instance of a static class',
    });
  }

  /**
   * Integration and sync.
   *
   * This function calls the Snowflake API to get all the tables with columns and inserts
   * all the data into the MongoDB database.
   * @param {Request} req - A request object with the body and parameters.
   * @param {Response} res - A response object to return JSON.
   * @param {NextFunction} next - The next middleware function in the chain.
   * @return {Promise<void | Response<unknown, Record<string, unknown>>>}
   */
  static async integrationSync(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response<unknown, Record<string, unknown>>> {
    try {
      const result = await MetadataModel.integrationSync();
      return res.json(result);
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Get tables.
   *
   * This function gets all the server built-in parameters and passes the request parameters
   * to fetch tables from the MongoDB database.
   * @param {Request} req - A request object with the body and parameters.
   * @param {Response} res - A response object to return JSON.
   * @param {NextFunction} next - The next middleware function in the chain.
   * @return {Promise<Response<unknown, Record<string, unknown>>> | void}
   */
  static async tables(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response<unknown, Record<string, unknown>>> {
    try {
      const { page = '1', limit = '10' } = req.query;
      const result = await MetadataModel.tables(+page, +limit);
      return res.json(result);
    } catch (error) {
      return next(error);
    }
  }
}
