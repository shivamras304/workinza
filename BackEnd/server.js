const express = require("express");
const config = require("./config.json");
const bodyParser = require("body-parser");
const models = require("./db/models.js");

const routes = {
  signup: require("./api/public_routes/signup.js").route,
  login: require("./api/public_routes/login.js").route,
  projects: require("./api/private_routes/projects.js"),
}

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/signup", routes.signup);
app.use("/login", routes.login);
app.get("/", (req, res) => res.send("Serving the index.html"));

app.listen(config.SERVER.PORT, () => {
  console.log("Server started at http://localhost:" + config.SERVER.PORT)
})