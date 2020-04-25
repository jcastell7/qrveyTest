/** @module models */
module.exports = {
  Model: {
    /**
     * User model module.
     * @module user/model
     * @see module:user/model
     */
    ...require("./user"),
    /**
     * Task model module.
     * @module task/model
     * @see module:task/model
     */
    ...require("./task"),
    /**
     * Project model module.
     * @module project/model
     * @see module:project/model
     */
    ...require("./project")
  }
};
