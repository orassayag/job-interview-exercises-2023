import express, { Express } from 'express';
import TablesRoutes from './public/metadata.routes';
import CustomError from '../custom/error.custom';

export default class IndexPublicRoutes {
  private constructor() {
    throw new CustomError({ message: 'Cannot create an instance of a static class' });
  }

  /**
   * Initiate.
   *
   * Initiate the public routes: metadata.
   * @return {Express}
   */
  public static initiate(): Express {
    const routes: Express = express();
    routes.use('/metadata', TablesRoutes.initiate());
    return routes;
  }
}
