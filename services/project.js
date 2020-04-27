/**
 * models module.
 * @module models
 * @see module:models
 */
const { Model } = require("../models");
const User = require("./user");

let projectService = {
  /**
   *creates a new project
   * @param {JSON} a json with the name value
   * @returns
   */
  create: projectData => {
    let project = new Model.Project(projectData);
    return project.save();
  },
  /**
   *
   *adds a task to the project
   * @param {string} taskId
   * @param {string} projectId
   * @returns
   */
  addTask: (taskId, projectId) => {
    return new Promise((resolve, reject) => {
      Model.Project.findById(projectId).exec((err, project) => {
        if (err) {
          return reject();
        } else if (!project) {
          return reject();
        }
        project.tasks.push(taskId);
        project.save().then(() => {
          resolve();
        });
      });
    });
  },
  /**
   *receives a project id and returns a list of the tasks
   +linked to the project
   * @param {string} projectId
   * @param {boolean} lean - flag to return a lean array or the mongoose wrap
   * @returns {promise} project with a list of task linked
   */
  listAllTasks: (projectId, lean) => {
    return new Promise((resolve, reject) => {
      Model.Project.findById(projectId, "tasks", { lean: lean })
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
   *
   *
   * @param {string} projectId
   * @returns{promise} the total time of all the task linked
   */
  projectTime: projectId => {
    return new Promise((resolve, reject) => {
      projectService
        .listAllTasks(projectId, true)
        .then(project => {
          let tasks = project.tasks;
          let time = 0;
          tasks.forEach(task => {
            time += task.seconds;
          });
          resolve(time);
        })
        .catch(err => {
          console.error(err);
          return reject();
        });
    });
  },
  ProjectUserTime: projectId => {
    return new Promise((resolve, reject) => {
      let projectTime;
      Model.Project.findById(projectId, "tasks")
        .lean()
        .populate({
          path: "tasks",
          populate: {
            path: "user"
          }
        })
        .exec((err, tasks) => {
          if (err) {
            return reject();
          }
          User.listAll().then(users => {
            /*users.forEach(user => {
              let userId = user._id;
              let userTasks = tasks.tasks.filter(task => {
                task.user._id === userId;
              });
              if (userTasks.length > 0) {
                let userTime = 0;
                userTasks.forEach(task => {
                  userTime += task.seconds;
                });
                projectTime.push({ userId: userId, seconds: userTime });
              }
            });*/
            projectTime = users.map(user => {
              let userId = user._id;
              let userTasks = tasks.tasks.filter(task => {
                return task.user._id.equals(userId);
              });
              if (userTasks.length > 0) {
                let userTime = 0;
                userTasks.forEach(task => {
                  userTime += task.seconds;
                });
                return { userId: userId, seconds: userTime };
              }
            });
            resolve(projectTime);
          });
        });
    });
  }
};

/** @module project/service */
module.exports = projectService;
