import AppointmentsService from '../services/appointments.service.js';
import CustomError from '../custom/error.custom.js';

export default class AppointmentsController {
  constructor() {
    throw new CustomError({ message: 'Cannot create an instance of a static class' });
  }

  /**
    * Initiate.
    *
    * Initiate all the appointments. Only for simulating connection to the database.
    * @param {array<object>} providers
    * @return {void}
    */
  static initiate(providers) {
    AppointmentsService.initiate(providers);
  }

  /**
    * Get appointments.
    *
    * This function gets all the server built in parameters, and passes the request query that
    * contains all the filters to sort and filter the appointments and returns the relevant
    * appointments.
    * @param {object} req - A request object with the body and parameters.
    * @param {object} res - A response object to return JSON.
    * @param {object} next - The next middleware function in the chain.
    * @return {Promise<array<object>>}
    */
  static async get(req, res, next) {
    const { specialty, date } = req.query;
    // Validate request body.
    if (!specialty || !date) {
      return res.status(400).json({ error: 'Bad request' });
    }
    try {
      const results = await AppointmentsService.get(req.query);
      return res.json(results);
    } catch (error) {
      return next(error);
    }
  }

  /**
    * Create a new appointment.
    *
    * This function gets all the server built in parameters, and passes the request body that
    * contains all the user details to create a new appointment in the database and return it.
    * @param {object} req - A request object with the body and parameters.
    * @param {object} res - A response object to return JSON.
    * @param {object} next - The next middleware function in the chain.
    * @return {Promise<object>}
    */
  static async create(req, res, next) {
    const { name, date } = req.body;
    // Validate request body
    if (!name || !date) {
      return res.status(400).json({ error: 'Bad request' });
    }
    try {
      const result = await AppointmentsService.create(req.body);
      if (result) {
        return res.json(result);
      }
      return res.status(400).json({ error: 'Requested date is not available' });
    } catch (error) {
      return next(error);
    }
  }
}
