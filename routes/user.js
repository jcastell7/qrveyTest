var express = require('express');
var router = express.Router();
const { Services } = require("../services");

/* GET user listing. */
router.get('/', function(req, res, next) {
  Services.User.create({userName: "juan",password: "contraseña"}).then(response => {
    res.send('the user was created');
  });
});

module.exports = router;
