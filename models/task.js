const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var ObjectID = require("bson-objectid");

/**
 * Represents a task.
 * @constructor
 * @param {string} name
 * @param {number} seconds
 * @param {string} status - the status of the task, could be:
 * "in-course", "paused"
 * @param {boolean} continuation - if the task is a continuation of an older task
 */
const taskSchema = new Schema({
  _id: ObjectId,
  name: String,
  seconds: Number,
  status: { type: String, default: "in-course" },
  continuation: { type: Boolean, default: false },
  set: createId
});

/**
 *Creates a new immutable ObjectID instance based
 *on the current system time.
 * @returns {string} mongodb id
 */
const createId = () => {
  return ObjectID().toString();
};

let task = mongoose.model("Task", taskSchema);

/** @module task/model */
module.exports = { Task: task };