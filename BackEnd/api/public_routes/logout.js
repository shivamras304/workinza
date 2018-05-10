const route = require("express").Router();

//Not a necessary route, user can just delete the jwt token on the client side as well and redirect to login page.
route.get("/", (req, res) => {
  res.status(200).send({
    auth: false,
    token: null
  });
})

module.exports.route = route;