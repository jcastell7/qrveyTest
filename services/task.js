/**
 * models module.
 * @module models
 * @see module:models
 */
const Model = require("../models");

let taskService = {
  /**
   *creates a new task
   * @param {JSON} a json with the values name, seconds, status, continuation
   * @returns
   */
  create: taskData => {
    let task = new Model.Task(taskData);
    task.save();
  }
};

/** @module task/service */
module.exports = taskService;
