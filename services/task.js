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
      let taskId;
      taskService
        .create({
          name: taskData.name,
          seconds: taskData.seconds,
          status: taskData.status,
          user: userId,
          continuation: taskData.continuation
        })
        .then(task => {
          taskId = task._id;
          User.addTask(userId, task)
            .then(() => {
              resolve(task);
            })
            .catch(err => {
              console.error(err);
              Model.Task.remove({ _id: taskId }).then(() => {
                return reject(err);
              });
            });
        })
        .catch(err => {
          console.error(err);
          Model.Task.remove({ _id: taskId });
          return reject("a parameter is not valid");
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
      Model.User.findById(userId, "tasks")
        .lean()
        .populate("tasks")
        .exec((err, tasks) => {
          if (err) {
            return reject("there was an error finding the user");
          }
          if (tasks === null) {
            return reject("the user was not found");
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
      Model.Task.findByIdAndUpdate(taskData._id, taskData, { new: true }).exec(
        (err, task) => {
          if (err) {
            return reject("there is an error in the query");
          } else if (!task) {
            return reject("the task was not found");
          }
          resolve(task);
        }
      );
    });
  },
  /**
   *
   *creates a new task with the same name of an existing task
   * @param {*} taskId
   * @returns
   */
  continue: taskId => {
    return new Promise((resolve, reject) => {
      Model.Task.findById(taskId, "name seconds user")
        .lean()
        .populate("user")
        .exec((err, task) => {
          if (err) {
            return reject();
          } else if (!task) {
            return reject("the task was not found");
          }
          let taskData = {
            name: task.name,
            seconds: task.seconds,
            status: "in-course",
            continuation: true
          };
          let userId = task.user._id.toString();
          taskService
            .newTask(taskData, userId)
            .then(task => {
              resolve(task);
            });
        });
    });
  }
};

/** @module task/service */
module.exports = taskService;
