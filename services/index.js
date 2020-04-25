/** @module models */
module.exports = {
  Services: {
    /**
     * User service module.
     * @module user/service
     * @see module:user/service
     */
    User: require("./user"),
    /**
     * Task service module.
     * @module task/service
     * @see module:task/service
     */
    Task: require("./task")
  }
};
