const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('market_post', {
    post_id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    post_by: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'user_profile',
        key: 'username'
      }
    },
    post_time: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    img: {
      type: DataTypes.STRING(250),
      allowNull: true,
      defaultValue: ".\/public\/defaultItem.png"
    },
    text: {
      type: DataTypes.STRING(250),
      allowNull: true,
      defaultValue: "insert your caption"
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: "untitled"
    },
    tag: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'market_post',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "market_post_pkey",
        unique: true,
        fields: [
          { name: "post_id" },
        ]
      },
    ]
  });
};
