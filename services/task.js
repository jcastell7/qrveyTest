/**
 * models module.
 * @module models
 * @see module:models
 */
const { Model } = require("../models");

let taskService = {
  /**
   *creates a new task
   * @param {JSON} a json with the values name, seconds, status, continuation adn the project
   * @returns
   */
  create: taskData => {
    let task = new Model.Task(taskData);
    return task.save();
  },
  /**
   *searches the database for tasks and brings
   *all the available records
   * @returns a list of tasks
   */
  listAll: userId => {
    return new Promise((resolve, reject) => {
      Model.User.findById(userId, "tasks")
        .populate("tasks")
        .exec((err, tasks) => {
          if (err) {
            return reject();
          }
          resolve(tasks);
        });
    });
  },
  /**
   *receives a modified task object and uploads the changes to the db
   * @param {task} taskData
   * @returns{task} the new task value
   */
  updateTasks: taskData => {
    return new Promise((resolve, reject) => {
      console.log("this is the task: ", taskData);
      Object.keys(taskData).forEach(key => taskData[key] === undefined && delete taskData[key])
      Model.Task.findByIdAndUpdate(taskData._id, taskData).exec((err, task) => {
        if (err) {
          return reject();
        } else if (!task) {
          return reject();
        }
        resolve(task);
      });
    });
  }
};

/** @module task/service */
module.exports = taskService;
