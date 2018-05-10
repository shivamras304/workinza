const route = require("express").Router();
const User = require("../../db/models.js").models.User;

//me route: sends the information about the current logged in user
route.get("/me", (req, res) => {
  User.findAll({
    attributes: ["id", "name", "email"],
    where: {
      id: req.userId
    }
  })
  .then(users => {
    res.send(users)
  })
  .catch(err => res.send(err))
})

module.exports.route = route;