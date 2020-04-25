/**
 * models module.
 * @module models
 * @see module:models
 */
const Model = require("../models");

let userService = {
  /**
   *creates a new user
   * @param {JSON} a json with the values username and password
   * @returns a new user on db
   */
  create: userData => {
    return new Model.User(userData);
  }
};

/** @module user/service */
module.exports = userService;
