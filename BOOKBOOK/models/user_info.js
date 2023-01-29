const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "user_info",
    {
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true,
      },
      pwd: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      permission: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      secret_key: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "user_info",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "user_info_pkey",
          unique: true,
          fields: [{ name: "username" }],
        },
      ],
    }
  );
};
