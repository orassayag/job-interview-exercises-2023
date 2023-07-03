import DataUtils from '../../utils/data.utils.js';
import CustomError from '../../custom/error.custom.js';

export default class UsersModel {
  constructor() {
    // Simulate the user's model from the database.
    this.users = [];
  }

  // VALIDATE ID
  static async validateUserExistence(id) {
    // Check if the user exists in the database.
    const result = this.users.filter((user) => user.id === id);
    if (!result || !result.length) {
      throw new CustomError({ message: `User with Id ${id} was not found`, status: 404 });
    }
    return result[0];
  }

  // VALIDATE EMAIL
  static async validateEmailExistence(id, email) {
    // Check if the user does not exist already with this email address.
    const result = this.users.find((user) => user.email === email.trim().toLowerCase());
    if (result && result.id && result.id !== id) {
      throw new CustomError({ message: `User with the email ${email} already exists in the database` });
    }
  }

  static initiate(users) {
    this.users = users;
  }

  // Multi
  static get(query) {
    return DataUtils.prepareData({ data: this.users, ...query });
  }

  // Single
  static async getById(id) {
    // Check if the user exists in the database.
    return this.validateUserExistence(id);
  }

  // POST
  static async create(data) {
    // Check if a user does not exist already with this email address.
    const email = data.email.trim().toLowerCase();
    await this.validateEmailExistence(data.id, email);
    // Create the new Id of the user (Simulation of database).
    const newId = this.users.length > 0 ? this.users[this.users.length - 1].id + 1 : 1;
    const newUser = { id: newId, email, ...data };
    // Add the user to the database.
    this.users = [...this.users, newUser];
    // Fetch the user back.
    return newUser;
  }

  // UPDATE
  static async update(id, data) {
    // Check if the user exists in the database.
    const currentUser = await this.validateUserExistence(id);
    // Check if the user does not exist already with this email address.
    const email = data.email.trim().toLowerCase();
    await this.validateEmailExistence(currentUser.id, email);
    // Update the user in the database.
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...data };
      }
      return user;
    });
    // Fetch the user back.
    return this.validateUserExistence(id);
  }

  // DELETE
  static async remove(id) {
    // Check if the user exists in the database.
    const removeUser = await this.validateUserExistence(id);
    // Delete the user from the database.
    this.users = this.users.filter((d) => d.id !== id);
    // Fetch the user back.
    return removeUser;
  }
}
