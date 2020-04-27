/**
 * models module.
 * @module models
 * @see module:models
 */
const { Model } = require("../models");
const User = require("./user");

let taskService = {
  /**
   *creates a new task
   * @param {JSON} a json with the values name, seconds, status, continuation adn the project
   * @returns {promise} a task value promise
   */
  create: taskData => {
    let task = new Model.Task(taskData);
    return task.save();
  },
  /**
   *creates a new task in db and adds the value to the user model
   * @param {*} taskData
   * @param {string} userId
   * @returns {promise} a task value promise
   */
  newTask: (taskData, userId) => {
    return new Promise((resolve, reject) => {
      taskService.create({
        name: taskData.name,
        seconds: taskData.seconds,
        status: taskData.status,
        user: userId,
        continuation: taskData.continuation
      })
        .then(task => {
          User.addTask(userId, task);
          resolve();
        })
        .catch(err => {
          console.error(err);
          return reject();
        });
    });
  },
  /**
   *searches the database for tasks and brings
   *all the available records
   * @returns a list of tasks
   */
  listAll: userId => {
    return new Promise((resolve, reject) => {
      Model.User.findById(userId, "tasks").lean()
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
      Object.keys(taskData).forEach(
        key => taskData[key] === undefined && delete taskData[key]
      );
      Model.Task.findByIdAndUpdate(taskData._id, taskData).exec((err, task) => {
        if (err) {
          return reject();
        } else if (!task) {
          return reject();
        }
        resolve(task);
      });
    });
  },
  /**
   *
   *creates a new task with the same name of an existing task
   * @param {*} taskId
   * @param {string} userId
   * @returns
   */
  continue: (taskId, userId) => {
    return new Promise((resolve, reject) => {
      Model.Task.findById(taskId, "name seconds").exec((err, task) => {
        if (err) {
          return reject();
        } else if (!task) {
          return reject();
        }
        let taskData = {
          name: task.name,
          seconds: task.seconds,
          status: "in-course",
          continuation: true
        };
        taskService
          .newTask(taskData, userId)
          .then(task => {
            resolve(task);
          })
          .catch(err => {
            console.error(err);
            return reject();
          });
      });
    });
  }
};

/** @module task/service */
module.exports = taskService;
