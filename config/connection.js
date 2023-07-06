require("dotenv").config();
const Sequelize = require("sequelize");

if (process?.env?.DB_NAME !== "messenger_db") {
  require("../utils.js").log(
    "bright red",
    "database environment name is incorrect"
  );
  process.exit();
}

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
    port: 3306,
  }
);

module.exports = sequelize;
