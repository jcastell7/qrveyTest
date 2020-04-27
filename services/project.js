/**
 * models module.
 * @module models
 * @see module:models
 */
const { Model } = require("../models");

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
      Model.Project.findById(projectId, "tasks", {lean: lean})
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
      projectService.listAllTasks(projectId, true).then(project => {
        let tasks = project.tasks;
        let time = 0;
        tasks.forEach(task => {
          time+=task.seconds;
        });
        resolve(time);
      }).catch(err => {
        console.error(err);
        return reject();
      });
    });
  },
  ProjectUserTime: (projectId) => {
    return new Promise((resolve, reject) => {
      projectService.listAllTasks(projectId, false).then(tasks => {
        console.log("this are the tasks: ", tasks);
        tasks.populate("user")
        .exec((err, user) => {
          console.log("this is the user: ", user);
        });
      });
    });
  }
};

/** @module project/service */
module.exports = projectService;
