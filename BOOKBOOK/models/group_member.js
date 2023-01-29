const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "group_member",
    {
      group_id: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        unique: true,
        references: {
          model: "group_info",
          key: "group_id",
        },
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true,
        unique: true,
        references: {
          model: "user_profile",
          key: "username",
        },
      },
      permission: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      blocked: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
    },
    {
      sequelize,
      tableName: "group_member",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "group_member_pkey",
          unique: true,
          fields: [{ name: "group_id" }, { name: "username" }],
        },
      ],
    }
  );
};
