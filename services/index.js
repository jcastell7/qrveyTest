/** @module models */
module.exports = {
  Model: {
    /**
     * User service module.
     * @module user/service
     * @see module:user/service
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
