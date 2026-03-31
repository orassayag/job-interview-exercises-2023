import express from 'express';
import JoiMiddleware from '../../middlewares/joi.middleware.js';
import AppointmentsController from '../../controllers/providers.controller.js';
import get from '../../validations/appointments/get.appointments.validation.js';
import create from '../../validations/appointments/post.appointments.validation.js';
import CustomError from '../../custom/error.custom.js';

export default class AppointmentsRoutes {
  constructor() {
    throw new CustomError({ message: 'Cannot create an instance of a static class' });
  }

  /**
    * Initiate.
    *
    * Initiate all the appointments routes.
    * @return {object}
    */
  static initiate() {
    const router = express.Router();

    router.get(
      '/',
      JoiMiddleware.validate({ query: get }),
      AppointmentsController.get,
    );

    router.post(
      '/',
      JoiMiddleware.validate({ body: create }),
      AppointmentsController.create,
    );

    return router;
  }
}
