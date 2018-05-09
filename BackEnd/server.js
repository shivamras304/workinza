const express = require("express");
const config = require("./config");
const bodyParser = require("body-parser");
const routes = require("./api/routes")
const models = require("./db/models")

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use ("/", routes);

app.listen(config.SERVER.PORT, () => {
  console.log("Server started at http://localhost:" + config.SERVER.PORT)
})