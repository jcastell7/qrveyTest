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
     * Task service module.
     * @module task/service
     * @see module:task/service
     */
    ...require("./task")
  }
};
