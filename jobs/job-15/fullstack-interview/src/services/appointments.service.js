import ProviderModel from '../models/appointment/provider.model.js';

export default class AppointmentsService {
  constructor() {
    // Simulate the appointments's model from the database.
    this.providers = [];
  }

  /**
    * Initiate.
    *
    * Initiate all the appointments. Only for simulating connection to the database.
    * @param {array<object>} appointments
    * @return {void}
    */
  static initiate(providers) {
    this.providers = providers.map((provider) => new ProviderModel(provider));
  }

  /**
    * Get an appointments.
    *
    * This function get request query that contains all the filters to sort and filter the
    * names and returns the relevant providers.
    * @param {object} query - An object that contains the relevant parameters.
    * @return {Promise<array<object>>}
    */
  static get(query) {
    const {
      specialty,
      date,
      minScore,
    } = query;
    const requestedDate = date;
    // Filter providers based on specialty, availability, and score.
    const filteredProviders = this.providers.filter((provider) => {
      const hasSpecialty = provider.specialties
        .map((s) => s.toLowerCase())
        .includes(specialty.toLowerCase());
      const hasAvailability = provider.availableDates
        .some((availability) => requestedDate >= availability.from
          && requestedDate <= availability.to);
      const meetsScoreThreshold = provider.score >= minScore;
      return hasSpecialty && hasAvailability && meetsScoreThreshold;
    });
    // Sort providers by score in descending order.
    const sortedProviders = filteredProviders.sort((a, b) => b.score - a.score);
    // Extract provider names.
    return sortedProviders.map(({ name }) => name);
  }

  /**
    * Create a new appointment.
    *
    * This function gets all the server built in parameters, and passes the request body that
    * contains all the appointments details to create a new appointment in the database and
    * return it.
    * @param {object} data - The appointments object to create into the database.
    * @return {Promise<object>}
    */
  static async create(data) {
    const { name, date } = data;
    const providerName = name.trim().toLowerCase();
    // Check if a appointments does not exist already with this doctor name and time.
    // Convert date to milliseconds since epoch.
    const requestedDate = date;
    // Check if the requested date is available.
    return this.providers.some((provider) => providerName === provider.name.trim().toLowerCase()
      && provider.availableDates.some((availability) => requestedDate >= availability.from
        && requestedDate <= availability.to));
  }
}
