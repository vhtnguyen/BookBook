const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "group_reported_member",
    {
      report_id: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      group_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        // unique: true,
        // references: {
        //   model: "group_member",
        //   key: "group_id",
        // },
      },
      member: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        // references: {
        //   model: "group_member",
        //   key: "username",
        // },
      },
      reason: {
        type: DataTypes.STRING(250),
        allowNull: true,
        defaultValue: "toxic member",
      },
    },
    {
      sequelize,
      tableName: "group_reported_member",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "group_reported_member_pkey",
          unique: true,
          fields: [{ name: "report_id" }],
        },
      ],
    }
  );
};
