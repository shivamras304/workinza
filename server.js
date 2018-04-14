const express = require("express");
const config = require("./config");
const bodyParser = require("body-parser");
const users = require("./api/users")

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/users", users);

app.listen(config.SERVER.PORT, () => {
  console.log("Server started at http://localhost:" + config.SERVER.PORT)
})