const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const phpass = require("phpass");
const passwordhash = new phpass.PasswordHash();

/**
 *Receives the password sent by the ui to the model 
 *and passses the password to the hash converter.
 * @param {string} password
 * @returns {string} obfuscated password
 */
const obfuscate = password => {
  return password
    ? (password = createPasswordHash(password))
    : (password = createPasswordHash("1234"));
};

/**
 *Turns the plain text password into a hash to be stored on the db
 *using the phpass npm module.
 * @param {string} password
 * @returns {string} hashed password
 */
const createPasswordHash = password => {
  return passwordhash.hashPassword(password);
};

/**
 * Represents a user.
 * @constructor
 * @param {string} userName
 * @param {string} password
 */
const userSchema = new Schema({
  userName: String,
  password: String
});

userSchema.path('password').set(password => {
  return obfuscate(password);
})

let user = mongoose.model("User", userSchema);

/** @module user/model */
module.exports = { User: user };
