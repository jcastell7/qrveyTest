const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var ObjectID = require("bson-objectid");
const phpass = require("phpass");
const passwordhash = new phpass.PasswordHash();

/**
 * Represents a user.
 * @constructor
 * @param {string} userName
 * @param {string} password
 */
const userSchema = new Schema({
  _id: ObjectId,
  userName: String,
  password: String,
  set: obfuscate,
  set: createId
});


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
 *Creates a new immutable ObjectID instance based
 *on the current system time.
 * @returns {string} mongodb id
 */
const createId = () => {
  return ObjectID().toString();
};

let user = mongoose.model("User", userSchema);

/** @module user/model */
module.exports = { User: user };
