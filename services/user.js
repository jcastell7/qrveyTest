/**
 * models module.
 * @module models
 * @see module:models
 */
const { Model } = require("../models");
const phpass = require("phpass");
const passwordhash = new phpass.PasswordHash();

let userService = {
  /**
   *creates a new user
   * @param {json} a json with the values username and password
   * @returns
   */
  create: userData => {
    let user = new Model.User(userData);
    return user.save();
  },
  /**
   *searches the username on the database and authenticates the password
   * @param {string} userName
   * @param {string} password
   * @returns
   */
  authenticate: (userName, password) => {
    return new Promise((resolve, reject) => {
      Model.User.findOne({ userName: userName }).exec((err, user) => {
        if (err) {
          return reject();
        } else if (!user) {
          return reject();
        }
        let auth = passwordhash.checkPassword(password, user.password);
        if (auth === true) {
          resolve(user);
        } else {
          return reject();
        }
      });
    });
  },
  /**
   *receives a userid and a task and attaches the task to the user
   * @param {string} userId
   * @param {model} task
   * @returns
   */
  addTask: (userId, task) => {
    return new Promise((resolve, reject) => {
      Model.User.findById(userId).exec((err, user) => {
        if (err) {
          return reject();
        } else if (!user) {
          return reject();
        }
        user.tasks.unshift(task._id);
        user.save().then(() => {
          resolve();
        });
      });
    });
  }
};

/** @module user/service */
module.exports = userService;
