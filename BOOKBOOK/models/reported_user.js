const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "reported_user",
    {
      report_id: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      reported_user: {
        type: DataTypes.STRING(50),
        allowNull: false,
        references: {
          model: "user_info",
          key: "username",
        },
      },
      reason: {
        type: DataTypes.STRING(250),
        allowNull: true,
        defaultValue: "toxic user",
      },
    },
    {
      sequelize,
      tableName: "reported_user",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "reported_user_pkey",
          unique: true,
          fields: [{ name: "report_id" }],
        },
      ],
    }
  );
};
