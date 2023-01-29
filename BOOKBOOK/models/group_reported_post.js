const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "group_reported_post",
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
        // references: {
        //   model: "group_wall",
        //   key: "group_id",
        // },
      },
      post_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        // references: {
        //   model: "group_wall",
        //   key: "post_id",
        // },
      },
      reason: {
        type: DataTypes.STRING(250),
        allowNull: true,
        defaultValue: "trash post",
      },
    },
    {
      sequelize,
      tableName: "group_reported_post",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "group_reported_post_pkey",
          unique: true,
          fields: [{ name: "report_id" }],
        },
      ],
    }
  );
};
