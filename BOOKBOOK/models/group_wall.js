const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "group_wall",
    {
      group_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "group_info",
          key: "group_id",
        },
      },
      post_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "general_post",
          key: "post_id",
        },
      },
    },
    {
      sequelize,
      tableName: "group_wall",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "group_wall_pkey",
          unique: true,
          fields: [{ name: "group_id" }, { name: "post_id" }],
        },
      ],
    }
  );
};
