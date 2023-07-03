import express from 'express';
import JoiMiddleware from '../../middlewares/joi.middleware.js';
import UsersController from '../../controllers/users.controller.js';
import get from '../../validations/users/get.users.validation.js';
import getById from '../../validations/users/getById.users.validation.js';
import create from '../../validations/users/post.users.validation.js';
import update from '../../validations/users/put.users.validation.js';
import remove from '../../validations/users/remove.users.validation.js';
import CustomError from '../../custom/error.custom.js';

export default class UsersRoutes {
  constructor() {
    throw new CustomError({ message: 'Cannot create an instance of a static class' });
  }

  static initiate() {
    const router = express.Router();

    // Multi
    router.get(
      '/',
      JoiMiddleware.validate({ query: get }),
      UsersController.get,
    );

    // Single
    router.get(
      '/:id',
      JoiMiddleware.validate({ params: getById }),
      UsersController.getById,
    );

    // POST
    router.post(
      '/',
      JoiMiddleware.validate({ body: create }),
      UsersController.create,
    );

    // UPDATE
    router.put(
      '/:id',
      JoiMiddleware.validate({ body: update.body, params: update.params }),
      UsersController.update,
    );

    // DELETE
    router.delete(
      '/:id',
      JoiMiddleware.validate({ params: remove }),
      UsersController.remove,
    );
    return router;
  }
}
