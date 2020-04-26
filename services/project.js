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
  }
};

/** @module project/service */
module.exports = projectService;
