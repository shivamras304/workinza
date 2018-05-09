const express = require("express");
const route = express.Router();
const {User, Project, UserProject} = require("../db/models.js").models;
const Op = require("sequelize").Op;

route.get("/", (req, res) => {
  res.send("Serve the index.html page");
})

//SignUp Route: The user sends name, email and password in the request body. Send a token for signup successful or unsuccessful signup. If successful, redirect to login page from client side or ask to sign up again.
route.post("/users", (req, res) => {
  User.create({
    name: req.body.name,
    email: req.body.email.toLowerCase(),
    password: req.body.password
  }, {
    returning: true
  })
  .then(user => {
    res.send("Signup successful!");
  })
  .catch(err => {
    if(err.name === "SequelizeUniqueConstraintError") {
      res.send("Signup unsuccessful! This email is already in use.");
    }
    console.log(err);
    res.send("Signup unsuccessful");
  })
})

//The user sends email and password in the request body. Send a token for successful or unsuccessful login. If successful, send the id of the user and redirect the user to create projects page from client side, otherwise show a message for "Wrong email or password!"
route.post("/login", (req, res) => {
  User.findAll({
    attributes: ["id", "name", "email"],
    where: {
      email: req.body.email.toLowerCase(),
      password: req.body.password
    }
  })
  .then(users => {
    if(users[0]) {
      res.send(users[0]);
    }

    //Send empty object if user not found
    res.send({});
  })
  .catch(err => res.send(err))
})


/////////////////////////////////////////////////////////////////////////
//TODO Paths related to Projects related to the given id

// route.get("/:userId/projects", (req, res) => {
//   res.send("GET request for user " + req.params.userId);
// })

// route.post("/:userId/projects", (req, res) => {
//   res.send("POST request for user " + req.params.userId);
// })

// route.put("/:userId/projects/:projectId", (req, res) => {
//   res.send("PUT request for user " + req.params.userId);
// })

// route.delete("/:userId/projects/:projectId", (req, res) => {
//   res.send("DELETE request for user " + req.params.userId);
// })

module.exports = route;