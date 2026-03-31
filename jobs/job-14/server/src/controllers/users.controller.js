import UsersModel from '../models/user/users.model.js';
import CustomError from '../custom/error.custom.js';

export default class UsersController {
  constructor() {
    throw new CustomError({ message: 'Cannot create an instance of a static class' });
  }

  static initiate(users) {
    UsersModel.initiate(users);
  }

  // Multi
  static async get(req, res, next) {
    try {
      const results = await UsersModel.get(req.query);
      return res.json(results);
    } catch (error) {
      return next(error);
    }
  }

  // Single
  static async getById(req, res, next) {
    try {
      const result = await UsersModel.getById(req.params.id);
      return res.json(result);
    } catch (error) {
      return next(error);
    }
  }

  // POST
  static async create(req, res, next) {
    try {
      const result = await UsersModel.create(req.body);
      return res.json(result);
    } catch (error) {
      return next(error);
    }
  }

  // UPDATE
  static async update(req, res, next) {
    try {
      const result = await UsersModel.update(req.params.id, req.body);
      return res.json(result);
    } catch (error) {
      return next(error);
    }
  }

  // REMOVE
  static async remove(req, res, next) {
    try {
      const result = await UsersModel.remove(req.params.id);
      return res.json(result);
    } catch (error) {
      return next(error);
    }
  }
}
