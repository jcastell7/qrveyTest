const chai = require("chai");
const should = chai.should();
const expect = chai.expect;
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
        Model.Task.remove({}).then(function() {
          Model.Project.remove({}).then(function() {
            done();
          });
        });
      });
    });
});

describe("User services", function() {
  describe("user register", function() {
    it("Should return a new user model with name 'name' and a hash password", function(done) {
      Services.User.create({ userName: "name", password: "password" }).then(
        function(user) {
          //console.log("this is the new user: ", user);
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
          //console.log("this is the loged user: ", user);
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
    it("Should reject the authentication based on a wrong password", function(done) {
      Services.User.authenticate("name", "wrong-password")
        .then(function(user) {
          //console.log("this is the wrong loged user: ", user);
          done();
        })
        .catch(function(err) {
          //console.error("this is the login error: ", err);
          expect(err).to.equal("password is wrong");
          done();
        });
    });
    it("Should reject the authentication based on a non existing username", function(done) {
      Services.User.authenticate("wrong-name", "password")
        .then(function(user) {
          //console.log("this is the wrong loged user: ", user);
          done();
        })
        .catch(function(err) {
          //console.error("this is the login error: ", err);
          expect(err).to.equal("user not found");
          done();
        });
    });
    it("Should reject the authentication based on a wrong usage of the function", function(done) {
      Services.User.authenticate({ userName: "name", password: "password" })
        .then(function(user) {
          //console.log("this is the wrong loged user: ", user);
          done();
        })
        .catch(function(err) {
          //console.error("this is the login error: ", err);
          expect(err).to.equal("there is an error searching the user");
          done();
        });
    });
  });

  describe("list all users", function() {
    it("should list all the users registered on the db", function(done) {
      Services.User.listAll().then(function(users) {
        //console.log("this are the users:", users);
        expect(users).to.be.an("array");
        expect(users).to.have.lengthOf(1);
        expect(users[0].userName).to.equal("name");
        done();
      });
    });
  });
});

describe("Task services", function() {
  describe("Task creation", function() {
    it("should create a task and add the id to the user that created it and add the user id to the task", function(done) {
      Model.User.findOne({ userName: "name" })
        .lean()
        .exec(function(err, user) {
          let userId = user._id;
          let taskData = {
            name: "taskName"
          };
          Services.Task.newTask(taskData, userId).then(function() {
            Model.Task.findOne({ name: "taskName" })
              .lean()
              .exec(function(err, task) {
                //console.log("this is the user id: ", userId.toString());
                should.not.exist(err);
                task.name.should.equal("taskName");
                task.status.should.equal("in-course");
                task.user.toString().should.equal(userId.toString());
                task.continuation.should.equal(false);
                done();
              });
          });
        });
    });
    it("should create a task and fail to add the id to a user that does not exist", function(done) {
      let userId = "5ea63d926e4108272de819d6";
      let taskData = {
        name: "taskName"
      };
      Services.Task.newTask(taskData, userId)
        .then(function() {})
        .catch(function(err) {
          //console.log("this is the user error: ", err);
          expect(err).to.equal("the user does not exist");
          done();
        });
    });
    it("should create a task and fail to get the information of the user", function(done) {
      let userId = { userId: "5ea63d926e4108272de819d6" };
      let taskData = {
        name: "taskName"
      };
      Services.Task.newTask(taskData, userId)
        .then(function() {})
        .catch(function(err) {
          expect(err).to.equal("a parameter is not valid");
          done();
        });
    });
  });
  describe("linking a tag to a  user", function() {
    it("should list the task linked to the user loged in", function(done) {
      Model.User.findOne({ userName: "name" })
        .lean()
        .exec(function(err, user) {
          let userId = user._id;
          Services.Task.listAll(userId).then(function(tasks) {
            expect(tasks.tasks).to.have.lengthOf(1);
            let task = tasks.tasks[0];
            task.name.should.equal("taskName");
            task.status.should.equal("in-course");
            task.user.toString().should.equal(userId.toString());
            task.continuation.should.equal(false);
            done();
          });
        });
    });
    it("should throw an error when the user does not exist", function(done) {
      let userId = "5ea63d926e4108272de819d6";
      Services.Task.listAll(userId)
        .then(function() {})
        .catch(function(err) {
          expect(err).to.equal("the user was not found");
          done();
        });
    });
  });
  describe("modify a task stored on db", function() {
    it("should change the values of the task stored in the database", function(done) {
      Model.User.findOne({ userName: "name" })
        .lean()
        .exec(function(err, user) {
          let userId = user._id;
          Services.Task.listAll(userId).then(function(tasks) {
            let task = tasks.tasks[0];
            task.name = "taskNewName";
            task.seconds = 50;
            task.status = "paused";
            Services.Task.updateTasks(task).then(function(editedTask) {
              editedTask.name.should.equal("taskNewName");
              editedTask.seconds.should.equal(50);
              editedTask.status.should.equal("paused");
              done();
            });
          });
        });
    });
    it("should throw an error when trying to change the values of the task with a bad parameter", function(done) {
      let task = {
        _id: "5ea63d926e4108272de819d6",
        name: "taskNewName",
        seconds: 50,
        status: "paused"
      };
      Services.Task.updateTasks(task)
        .then(function() {})
        .catch(function(err) {
          expect(err).to.equal("the task was not found");
          done();
        });
    });
    it("should create a new task with the same name", function(done) {
      Model.User.findOne({ userName: "name" })
        .lean()
        .exec(function(err, user) {
          let userId = user._id;
          Services.Task.listAll(userId).then(function(tasks) {
            let task = tasks.tasks[0];
            Services.Task.continue(task._id.toString()).then(function(
              continuedTask
            ) {
              continuedTask._id
                .toString()
                .should.not.equal(task._id.toString());
              continuedTask.name.should.equal("taskNewName");
              continuedTask.seconds.should.equal(50);
              continuedTask.status.should.equal("in-course");
              continuedTask.continuation.should.equal(true);
              done();
            });
          });
        });
    });
  });
});

after("closing db connection", function(done) {
  Model.User.remove({}).then(function() {
    Model.Task.remove({}).then(function() {
      Model.Project.remove({}).then(function() {
        mongoose.connection.close().then(function() {
          done();
        });
      });
    });
  });
});
