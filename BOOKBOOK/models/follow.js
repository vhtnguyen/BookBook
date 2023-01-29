const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('follow', {
    usr_follow: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'user_profile',
        key: 'username'
      }
    },
    usr_followed: {
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
    tableName: 'follow',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "follow_pkey",
        unique: true,
        fields: [
          { name: "usr_followed" },
          { name: "usr_follow" },
        ]
      },
    ]
  });
};
