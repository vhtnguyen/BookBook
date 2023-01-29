const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_blocked', {
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user_info',
        key: 'username'
      }
    },
    user_blocked: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user_profile',
        key: 'username'
      }
    }
  }, {
    sequelize,
    tableName: 'user_blocked',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "user_blocked_pkey",
        unique: true,
        fields: [
          { name: "username" },
          { name: "user_blocked" },
        ]
      },
    ]
  });
};
