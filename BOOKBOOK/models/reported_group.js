const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "reported_group",
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
        references: {
          model: "group_info",
          key: "group_id",
        },
      },
      reason: {
        type: DataTypes.STRING(250),
        allowNull: true,
        defaultValue: "toxic group",
      },
    },
    {
      sequelize,
      tableName: "reported_group",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "reported_group_pkey",
          unique: true,
          fields: [{ name: "report_id" }],
        },
      ],
    }
  );
};
