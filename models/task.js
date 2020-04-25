const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
  name: String,
  seconds: Number,
  status: { type: String, default: "in-course" },
  continuation: { type: Boolean, default: false },
  creationDate : {type: Date, immutable: true, default: Date.now}
});

let task = mongoose.model("Task", taskSchema);

/** @module task/model */
module.exports = { Task: task };