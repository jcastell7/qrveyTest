/** @module services */
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
    Task: require("./task"),
    /**
     * Project service module.
     * @module project/service
     * @see module:project/service
     */
    Project: require("./project")
  }
};
