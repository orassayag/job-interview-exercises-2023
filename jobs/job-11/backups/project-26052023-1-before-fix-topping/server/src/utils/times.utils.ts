import CustomError from '../custom/error.custom';

export default class TimesUtils {
  private constructor() {
    throw new CustomError({ message: 'Cannot create an instance of a static class' });
  }

  public static getProcessTime(record: any): String {
    // Calculate processing time in seconds.
    const processingTimeSeconds = Math.floor(
      (record.updatedAt.getTime() - record.createdAt.getTime()) / 1000
    );
    // Convert processing time to MM:ss format.
    const minutes = Math.floor(processingTimeSeconds / 60);
    const seconds = processingTimeSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
}
