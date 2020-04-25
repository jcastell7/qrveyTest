var express = require('express');
var router = express.Router();
const { Services } = require("../services");
var bodyParser = require('body-parser')
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

/* GET user listing. */
router.get('/', function(req, res, next) {
  Services.User.create({userName: "juan",password: "contraseña"}).then(response => {
    res.send('the user was created');
  });
});

/* POST new user*/
router.post('/', urlencodedParser, (req, res, next) => {
  Services.User.create({userName: req.body.userName, password: req.body.password}).then(() => {
    res.sendStatus(200);
  }).catch(err => {
    console.error(err);
    res.sendStatus(400)
  });
});

module.exports = router;
