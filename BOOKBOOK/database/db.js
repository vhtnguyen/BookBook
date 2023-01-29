const Sequelize = require("sequelize");
const initModels = require("../models/init-models");
const config = require("../configs/config");
var sequelize;
if (config.NODE_ENV === "development") {
  sequelize = new Sequelize(config.DB_NAME, config.DB_USERNAME, config.DB_PWD, {
    host: config.DB_HOST,
    dialect: config.DB_DIALECT,
    // console.log the db logging or not
    logging: false,
  });
} else {
  sequelize = new Sequelize(
    "postgresql://postgres:sOyMI7bskMemA0zij05H@containers-us-west-91.railway.app:5452/railway"
  );
}

module.exports = {
  sequelize,
  models: initModels(sequelize),
};
