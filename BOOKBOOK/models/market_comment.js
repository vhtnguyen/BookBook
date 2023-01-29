const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "market_comment",
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
          model: "market_post",
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
      cmt_time: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.Sequelize.fn("now"),
      },
      text: {
        type: DataTypes.STRING(250),
        allowNull: true,
        defaultValue: "your comment",
      },
    },
    {
      sequelize,
      tableName: "market_comment",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "market_comment_pkey",
          unique: true,
          fields: [{ name: "cmt_id" }],
        },
      ],
    }
  );
};
