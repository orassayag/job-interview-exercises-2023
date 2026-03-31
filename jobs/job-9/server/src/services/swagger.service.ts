import swaggerJsdoc, { Options } from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import packageJSON from '../../package.json';
import CustomError from '../custom/error.custom';

export default class SwaggerService {
  private constructor() {
    throw new CustomError({ message: 'Cannot create an instance of a static class' });
  }

  /**
   * Initiate the Swagger service.
   *
   * Get the server's URL and create the parts to initiate the Swagger service.
   * @param url - The server's URL.
   * @return {object}
   */
  public static initiate(url: string): { swaggerUi: typeof swaggerUi; swaggerSetup: object } {
    const swaggerOptions: Options = {
      definition: {
        swagger: '2.0',
        info: {
          title: 'Server Swagger',
          version: '0.1.0',
          description:
            'This is a simple Snowflake API application made with Express and documented with Swagger',
          license: {
            name: packageJSON.license,
            url: 'https://spdx.org/licenses/MIT.html',
          },
          contact: packageJSON.contributors[0],
        },
        servers: [{ url }],
      },
      apis: ['./src/routes/public/*.ts'],
    };
    const swaggerSetup = swaggerJsdoc(swaggerOptions);
    return {
      swaggerUi,
      swaggerSetup,
    };
  }
}
