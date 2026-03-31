import CustomError from '../custom/error.custom.js';

export default class DataUtils {
  constructor() {
    throw new CustomError({ message: 'Cannot create an instance of a static class' });
  }

  // Implement Winston here.

  static log(message) {
    console.log(message);
  }

  static info(message) {
    console.log(message);
  }

  static error(message) {
    console.error(message);
  }
}
