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
  authenticate: (userName, password) => {
    return new Promise((resolve, reject) => {
      Model.User.findOne({ userName: userName }).exec((err, user) => {
        if (err) {
          return reject();
        }else if(!user){
          return reject();
        }
        let auth = passwordhash.checkPassword(password, user.password);
        if(auth===true){
          resolve(user);
        }else{
          return reject();
        }
      });
    });
  }
};

/** @module user/service */
module.exports = userService;
