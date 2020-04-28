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
   *brings a list of all the users in the database
   * @returns {promise} a list of all the users
   */
  listAll: ()=> {
    return new Promise((resolve,reject) => {
      Model.User.find({}).lean().exec((err, users) => {
        if (err) {
          return reject();
        }
        resolve(users);
      })
    });
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
          return reject("there is an error searching the user");
        } else if (!user) {
          return reject("user not found");
        }
        let auth = passwordhash.checkPassword(password, user.password);
        if (auth === true) {
          resolve(user);
        } else {
          return reject("password is wrong");
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
          return reject("there was an error finding the user");
        } else if (!user) {
          return reject("the user does not exist");
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
