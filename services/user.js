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
   * @returns
   */
  create: userData => {
    let user = new Model.User(userData);
    user.save();
  }
};

/** @module user/service */
module.exports = userService;
