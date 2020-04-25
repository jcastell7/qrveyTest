var express = require("express");
var router = express.Router();
const { Services } = require("../services");
var bodyParser = require("body-parser");
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

/*POST for user login*/
router.post("/login", urlencodedParser, (req, res, next) => {
  Services.User.authenticate(req.body.userName, req.body.password)
    .then(user => {
      req.session.userId = user._id;
      res.sendStatus(200);
    })
    .catch(err => {
      res.sendStatus(401);
    });
});

/*GET for logout */
router.get('/logout', (req, res, next) => {
  if (req.session) {
    req.session.destroy(err => {
      if(err) {
        return next(err);
      } else {
        return res.sendStatus(200);
      }
    });
  }
});

/* POST new user*/
router.post("/", urlencodedParser, (req, res, next) => {
  Services.User.create({
    userName: req.body.userName,
    password: req.body.password
  })
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(400);
    });
});

/** @module user/router */
module.exports = router;
