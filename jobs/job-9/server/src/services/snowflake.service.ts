import snowflake from 'snowflake-sdk';
import Logger from './logger.service';
import CONSTANTS from '../config/constants.config';
import CustomError from '../custom/error.custom';

export default class SnowflakeService {
  private static createConnection: snowflake.Connection | null = null;
  private static connection: snowflake.Connection | null = null;

  /**
   * Initiate the Snowflake service.
   *
   * @return {Promise<void>}
   */
  public static async initiate(): Promise<void> {
    const { ACCESS_URL, USERNAME, PASSWORD, ACCOUNT, DATABASE, ROLE } = CONSTANTS.DATA.SNOWFLAKE;
    this.createConnection = snowflake.createConnection({
      // @ts-ignore
      accessUrl: ACCESS_URL,
      username: USERNAME,
      password: PASSWORD,
      account: ACCOUNT,
      database: DATABASE,
      role: ROLE,
    });

    snowflake.configure({ insecureConnect: true });

    return new Promise((resolve, reject) => {
      this.createConnection!.connect((err, conn) => {
        if (err) {
          throw new CustomError({
            message: `Snowflake failed to be initiated: ${err.message}`,
            status: 500,
          });
        } else {
          this.connection = conn;
          Logger.info('Snowflake initiated successfully');
          resolve();
        }
      });
    });
  }

  public static execute(sql: string): Promise<any[] | undefined> {
    return new Promise((resolve, reject) => {
      this.connection!.execute({
        sqlText: sql,
        complete: (err, stmt, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        },
      });
    });
  }
}
