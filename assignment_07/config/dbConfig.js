const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("ASSIGNMENT_07", "local_user", "password", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
