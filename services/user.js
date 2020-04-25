const Model = require ("../models");

let userService = {
    create = userData => {
       return new Model.User(userData);
    }
}

module.exports = userService;