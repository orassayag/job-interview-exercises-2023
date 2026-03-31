import express from 'express';
import AppointmentsRoutes from './public/appointments.routes.js';
import CustomError from '../custom/error.custom.js';

export default class IndexPublicRoutes {
  constructor() {
    throw new CustomError({ message: 'Cannot create an instance of a static class' });
  }

  /**
    * Initiate.
    *
    * Initiate the public routes: appointments.
    * @return {object}
    */
  static initiate() {
    const routes = express();
    routes.use('/appointments', AppointmentsRoutes.initiate());
    return routes;
  }
}
