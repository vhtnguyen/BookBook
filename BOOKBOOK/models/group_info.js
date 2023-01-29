const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('group_info', {
    group_id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    group_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(250),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'group_info',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "group_info_pkey",
        unique: true,
        fields: [
          { name: "group_id" },
        ]
      },
    ]
  });
};
