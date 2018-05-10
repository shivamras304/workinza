const route = require("express").Router();
const User = require("../../db/models.js").models.User;
const jwt = require("jsonwebtoken");
const config = require("../../config.json");

//The user sends email and password in the request body. Send a token for successful or unsuccessful login. If successful, send the id of the user and redirect the user to create projects page from client side, otherwise show a message for "Wrong email or password!"
route.post("/", (req, res) => {
  User.findAll({
    attributes: ["id", "name", "email"],
    where: {
      email: req.body.email.toLowerCase(),
      password: req.body.password
    }
  })
  .then(users => {
    if(users[0]) {
      const jwtToken = jwt.sign({id: users[0].id}, config.SECRET, {
        expiresIn: "3d" //expires in 3 days
      })
      res.send({
        auth: true,
        token: jwtToken,
        message: "Login successful!"
      });
    }

    //Send empty object if user not found
    res.send({
      auth: false,
      message: "Login unsuccessful!"
    });
  })
  .catch(err => res.send(err))
})

module.exports.route = route;