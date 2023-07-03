import mongoose from 'mongoose';
import Logger from './logger.provider';
import CustomError from '../custom/error.custom';
import CONSTANTS from '../config/constants.config';

export default class MongoDBProvider {
  private constructor() {
    throw new CustomError({ message: 'Cannot create an instance of a static class' });
  }

  /**
   * Initiate the mongodb provider.
   *
   * @return {Promise<void>}
   */
  public static async initiate(): Promise<void> {
    try {
      await mongoose.connect(CONSTANTS.DATA.MONGODB.CONNECTION_URL);
      Logger.info(
        `MongoDB provider initiated successfully: ${CONSTANTS.DATA.MONGODB.CONNECTION_URL}`
      );
    } catch (err) {
      throw new CustomError({
        message: `MongoDB provider failed to be initiated: ${err}`,
        status: 500,
      });
    }
  }
}
