const {User, Project, UserProject} = require("../db/models.js").models;

User.create({
  name: "Shivam Rastogi",
  email: "shivam@xyz.com",
  password: "titpw"
}).catch(err => console.error(err))
User.create({
  name: "Ishan Rastogi",
  email: "ishan@xyz.com",
  password: "pass1234"
}).catch(err => console.error(err))
User.create({
  name: "Surbhi Rastogi",
  email: "surbhi@xyz.com",
  password: "heyya"
}).catch(err => console.error(err))
User.create({
  name: "Deepanshi Rastogi",
  email: "deepa@xyz.com",
  password: "deeparas"
}).catch(err => console.error(err))

module.exports = {}