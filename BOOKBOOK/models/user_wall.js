const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_wall', {
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user_info',
        key: 'username'
      }
    },
    post_id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'general_post',
        key: 'post_id'
      }
    }
  }, {
    sequelize,
    tableName: 'user_wall',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "user_wall_pkey",
        unique: true,
        fields: [
          { name: "username" },
          { name: "post_id" },
        ]
      },
    ]
  });
};
