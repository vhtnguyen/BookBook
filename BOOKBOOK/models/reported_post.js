const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "reported_post",
    {
      report_id: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      post_id: {
       
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "general_post",
          key: "post_id",
        },
      },
      reason: {
        type: DataTypes.STRING(250),
        allowNull: true,
        defaultValue: "trash post",
      },
    },
    {
      sequelize,
      tableName: "reported_post",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "reported_post_pkey",
          unique: true,
          fields: [{ name: "report_id" }],
        },
      ],
    }
  );
};
