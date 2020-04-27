const chai = require("chai");
const should = chai.should();
const expect = chai.expect;
const { Services } = require("../services");
const { Model } = require("../models");
const mongoose = require("mongoose");
const config = require("config");

before("connect to db", function(done) {
    mongoose
      .connect(config.get("database.connect"), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      })
      .then(function() {
        Model.Task.remove({}).then(function() {
          done();
        });
      });
  });

  after("closing db connection", function(done) {
    Model.Task.remove({}).then(function() {
      mongoose.connection.close().then(function() {
        done();
      });
    });
  });
  