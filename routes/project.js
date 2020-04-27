var express = require("express");
var router = express.Router();
const { Services } = require("../services");
var bodyParser = require("body-parser");
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

/* POST new project*/
router.post("/", urlencodedParser, (req, res, next) => {
  if (!req.session.userId) {
    res.sendStatus(401);
  } else {
    Services.Project.create({ name: req.body.name })
      .then(() => {
        res.sendStatus(200);
      })
      .catch(err => {
        console.error(err);
        res.sendStatus(400);
      });
  }
});

/* POST connect task to project*/
router.post("/link", urlencodedParser, (req, res, next) => {
  if (!req.session.userId) {
    res.sendStatus(401);
  } else {
    Services.Project.addTask(req.body.taskId, req.body.projectId)
      .then(() => {
        res.sendStatus(200);
      })
      .catch(err => {
        console.error(err);
        res.sendStatus(400);
      });
  }
});

/* GET receive the total time of the project*/
router.get('/:projectId(([a-f0-9]{24}))/time', (req, res, next) => {
  if (!req.session.userId) {
    res.sendStatus(401);
  } else {
    Services.Project.projectTime(req.params.projectId)
      .then(time => {
        res.send(`${time}`);
      })
      .catch(err => {
        console.error(err);
        res.sendStatus(400);
      });
  }
});

/* GET receive the total time of every user on the project*/
router.get('/:projectId(([a-f0-9]{24}))/userTime', (req, res, next) => {
  if (!req.session.userId) {
    res.sendStatus(401);
  } else {
    Services.Project.ProjectUserTime(req.params.projectId)
      .then(time => {
        res.send(`${time}`);
      })
      .catch(err => {
        console.error(err);
        res.sendStatus(400);
      });
  }
});

/** @module project/router */
module.exports = router;