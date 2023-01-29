const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('reaction', {
    react_on: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'general_post',
        key: 'post_id'
      }
    },
    react_type: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    react_by: {
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
    tableName: 'reaction',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "reaction_pkey",
        unique: true,
        fields: [
          { name: "react_on" },
          { name: "react_by" },
        ]
      },
    ]
  });
};
