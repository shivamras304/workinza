const express = require("express");
const config = require("./config.json");
const bodyParser = require("body-parser");
const models = require("./db/models.js");
const verifyToken = require("./api/auth/verifyToken.js");

const routes = {
  signup: require("./api/public_routes/signup.js").route,
  login: require("./api/public_routes/login.js").route,
  logout: require("./api/public_routes/logout.js").route,
  users: require("./api/private_routes/users.js").route,
  projects: require("./api/private_routes/projects.js").route,
}

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Public routes
app.get("/", (req, res) => res.send("Serving the index.html"));
app.use("/signup", routes.signup);
app.use("/login", routes.login);
app.use("/logout", routes.logout);


//Authentication for all private routes
app.use(verifyToken)

//Private routes
app.use("/users", routes.users)

app.listen(config.SERVER.PORT, () => {
  console.log("Server started at http://localhost:" + config.SERVER.PORT)
})