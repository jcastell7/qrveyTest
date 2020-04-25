var express = require("express");
var router = express.Router();
const { Services } = require("../services");
var bodyParser = require("body-parser");
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

/* GET task listing. */
router.get("/", (req, res, next) => {
  if (!req.session.userId) {
    res.sendStatus(401);
  } else {
    Services.Task.listAll(req.session.userId).then(tasks => {
      res.send(tasks);
    });
  }
});

/* POST new task*/
router.post("/", urlencodedParser, (req, res, next) => {
  if (!req.session.userId) {
    res.sendStatus(401);
  } else {
    Services.Task.create({
      name: req.body.name,
      seconds: req.body.seconds,
      status: req.body.status,
      continuation: req.body.continuation
    })
      .then(task => {
        Services.User.addTask(req.session.userId, task);
        res.sendStatus(200);
      })
      .catch(err => {
        console.error(err);
        res.sendStatus(400);
      });
  }
});
/* POST edit task*/
router.post("/edit", urlencodedParser, (req, res, next) => {
  if (!req.session.userId) {
    res.sendStatus(401);
  } else {
    Services.Task.updateTasks({
      _id: req.body._id,
      name: req.body.name,
      seconds: req.body.seconds,
      status: req.body.status,
      continuation: req.body.continuation
    })
      .then(() => {
        res.sendStatus(200);
      })
      .catch(err => {
        console.error(err);
        res.sendStatus(400);
      });
  }
});

/** @module task/router */
module.exports = router;
