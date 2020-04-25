const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const phpass = require("phpass");
const passwordhash = new phpass.PasswordHash();


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
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tasks: [{type: Schema.Types.ObjectId, ref: 'Task'}]
});

userSchema.path("password").set(password => {
  return createPasswordHash(password);
});

let user = mongoose.model("User", userSchema);

/** @module user/model */
module.exports = { User: user };
