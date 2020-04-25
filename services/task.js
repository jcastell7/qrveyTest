/**
 * models module.
 * @module models
 * @see module:models
 */
const Model = require("../models");

let taskService = {
  /**
   *creates a new task
   * @param {JSON} a json with the values name, seconds, status, continuation adn the project
   * @returns
   */
  create: taskData => {
    let task = new Model.Task(taskData);
    return task.save();
  }
};

/** @module task/service */
module.exports = taskService;
