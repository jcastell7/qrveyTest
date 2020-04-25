/**
 * models module.
 * @module models
 * @see module:models
 */
const Model = require("../models");

let projectService = {
  /**
   *creates a new project
   * @param {JSON} a json with the values name
   * @returns
   */
  create: projectData => {
    let project = new Model.Project(projectData);
    return project.save();
  }
};

/** @module project/service */
module.exports = projectService;
