const route = require("express").Router();
const User = require("../../db/models.js").models.User;
const jwt = require("jsonwebtoken");
const config = require("../../config.json");

//SignUp Route: The user sends name, email and password in the request body. Send a token for signup successful or unsuccessful signup. If successful, redirect to login page from client side or ask to sign up again.
route.post("/", (req, res) => {
  User.create({
    name: req.body.name,
    email: req.body.email.toLowerCase(),
    password: req.body.password
  }, {
    returning: true
  })
  .then(user => {
    const jwtToken = jwt.sign({id: user.id}, config.SECRET, {
      expiresIn: "3d" //expires in 3 days
    })
    res.send({
      auth: true,
      token: jwtToken,
      message: "Signup successful!"
    });
  })
  .catch(err => {
    if(err.name === "SequelizeUniqueConstraintError") {
      res.status(500).send({
        auth: false,
        message: "Signup unsuccessful! This email is already in use."
      });
    }
    console.log(err);
    res.status(500).send({
      auth: false,
      message: "Signup unsuccessful! " + err
    });
  })
})

module.exports.route = route;