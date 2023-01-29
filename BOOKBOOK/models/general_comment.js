const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "general_comment",
    {
      cmt_id: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      cmt_on: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "general_post",
          key: "post_id",
        },
      },
      cmt_by: {
        type: DataTypes.STRING(50),
        allowNull: false,
        references: {
          model: "user_profile",
          key: "username",
        },
      },
      text: {
        type: DataTypes.STRING(250),
        allowNull: true,
        defaultValue: "your comment",
      },
      cmt_time: {
        type: DataTypes.TIME,
        allowNull: true,
        defaultValue: Sequelize.Sequelize.fn("now"),
      },
    },
    {
      sequelize,
      tableName: "general_comment",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "general_comment_pkey",
          unique: true,
          fields: [{ name: "cmt_id" }],
        },
      ],
    }
  );
};
