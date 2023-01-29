const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('general_post', {
    post_id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    author_username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'user_profile',
        key: 'username'
      }
    },
    date_post: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    img: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING(250),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'general_post',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "general_post_pkey",
        unique: true,
        fields: [
          { name: "post_id" },
        ]
      },
    ]
  });
};
