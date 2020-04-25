var express = require('express');
var router = express.Router();
const { Services } = require("../services");
var bodyParser = require('body-parser')
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


/* GET user listing. */
router.get('/', function(req, res, next) {
  Services.Task.create().then(response => {
    res.send('the task was created');
  });
});

/* POST new task*/
router.post('/', urlencodedParser, (req, res, next) => {
  Services.Task.create({}).then(() => {
    res.sendStatus(200);
  });
});

module.exports = router;
