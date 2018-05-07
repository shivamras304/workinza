const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;
const DB = require("../config.json").DB;

const db = new Sequelize(
  DB.DATABASE,
  DB.USERNAME,
  DB.PASSWORD, {
    host: DB.HOST,
    dialect: DB.DIALECT
  }
)

const User = db.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    isEmail: true,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

const Project = db.define('projects', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  }
})

Project.belongsToMany(User, {through: "user_project"});
//TODO understand if the below statement is needed
User.belongsToMany(Project, {through: "user_project"});

db.sync({force: true})
  .then(() => console.info("Database Configured"))
  .catch((err) => console.error(err));

module.exports.models = {
  User, Project
}

