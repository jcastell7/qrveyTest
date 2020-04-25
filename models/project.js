const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Represents a project.
 * @constructor
 * @param {string} name
 */
const projectSchema = new Schema({
  name: String,
  tasks: [{type: Schema.Types.ObjectId, ref: 'Task'}]
});

let project = mongoose.model("Project", projectSchema);

/** @module project/model */
module.exports = { Project: project };