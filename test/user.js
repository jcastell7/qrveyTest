const chai = require("chai");
const should = chai.should();
const expect = chai.expect;
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const { Services } = require("../services");
const { Model } = require("../models");
const mongoose = require("mongoose");
const config = require("config");

before("connect", function(done) {
  mongoose
    .connect(config.get("database.connect"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
    .then(function() {
      Model.User.remove({}).then(function() {
        done();
      });
    });
});

describe("user register", function() {
  it("Should return a new user model with name 'name' and a hash password", function(done) {
    Services.User.create({ userName: "name", password: "password" }).then(
      function(user) {
        console.log("this is the new user: ", user);
        user.should.have.property("userName");
        user.userName.should.equal("name");
        user.password.should.have.lengthOf(60);
        done();
      }
    );
  });
});

describe("user login", function() {
  it("Should return the user model from the user and password", function(done) {
    Services.User.authenticate("name", "password")
      .then(function(user) {
        console.log("this is the loged user: ", user);
        user.should.have.property("userName");
        user.userName.should.equal("name");
        user.password.should.have.lengthOf(60);
        done();
      })
      .catch(function(err) {
        should.not.exist(err);
        done();
      });
  });
});

describe("list all users", function() {
  it("should list all the users registered on the db", function(done) {
    Services.User.listAll().then(function(users) {
      console.log("this are the users:", users);
      expect(users).to.be.an("array");
      expect(users).to.have.lengthOf(1);
      expect(users[0].userName).to.equal("name");
      done();
    });
  });
});

after("closing db connection", function(done) {
  Model.User.remove({}).then(function() {
    mongoose.connection.close().then(function() {
      done();
    });
  });
});
