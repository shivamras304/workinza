const express = require("express");
const route = express.Router();

route.get("/", (req, res) => {
  res.send("Sending the user data for the email sent via query params")
})

route.post("/", (req, res) => {
  res.send("Handle sign up and log in here")
})


/////////////////////////////////////////////////////////////////////////
//TODO Paths related to Projects related to the given id

route.get("/:userId/projects", (req, res) => {
  res.send("GET request for user " + req.params.userId);
})

route.post("/:userId/projects", (req, res) => {
  res.send("POST request for user " + req.params.userId);
})

route.put("/:userId/projects/:projectId", (req, res) => {
  res.send("PUT request for user " + req.params.userId);
})

route.delete("/:userId/projects/:projectId", (req, res) => {
  res.send("DELETE request for user " + req.params.userId);
})

module.exports = route;