import axios from 'axios';
import CustomError from '../custom/error.custom.js';
import LoggerService from '../services/logger.service.js';

export default class NetworksUtils {
  constructor() {
    throw new CustomError({ message: 'Cannot create an instance of a static class' });
  }

  /**
   * Send a request.
   *
   * This function gets the request options and performs a send request operation. If successful,
   * return the data (If exists). If failed, log all the details and throw an error.
   * @param options - The AXIOS sends request options (Headers, request type, etc).
   * @return {object}
   */
  static async sendRequest(options) {
    let data = null;
    try {
      const response = await axios(options);
      switch (response.status) {
        case 200: case 201:
          data = response.data;
          break;
        default:
          throw new Error(response);
      }
    } catch (error) {
      LoggerService.error(`Send request failed: ${error.name}: ${error.message}`);
    }
    return data;
  }
}
