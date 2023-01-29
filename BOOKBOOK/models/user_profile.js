const Sequelize = require("sequelize");
const validator = require("../services/helperServices");
module.exports = function (sequelize, DataTypes) {
  var user_profile = sequelize.define(
    "user_profile",
    {
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true,
        references: {
          model: "user_info",
          key: "username",
        },
      },
      fullname: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      gender: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      location: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: "fit@hcmus",
      },
      about: {
        type: DataTypes.STRING(250),
        defaultValue: "Nothing to say!",
        allowNull: true,
      },
      avatar: {
        type: DataTypes.STRING(300),
        allowNull: true,
        defaultValue: "default_avt.png",
      },
      dob: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        defaultValue: Sequelize.Sequelize.fn("now"),
      },
      searchable: {
        type: `tsvector GENERATED ALWAYS AS (((setweight(to_tsvector('english'::regconfig, (COALESCE(fullname, ''::character varying))::text), 'A'::"char") || setweight(to_tsvector('english'::regconfig, COALESCE(username, ''::text)), 'B'::"char")))) STORED`,
        set() {
          throw new Error("generatedValue is read-only");
        },
      },
    },
    {
      sequelize,
      tableName: "user_profile",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "user_profile_pkey",
          unique: true,
          fields: [{ name: "username" }],
        },
        {
          name: "idx_searchable",
          fields: ["searchable"],
          using: "gin",
        },
      ],
    }
  );
  user_profile.prototype.validUpdate = function (newUpdate) {
    let result = {};
    if (validator.validFullName(newUpdate.fullname)) {
      result.fullname = newUpdate.fullname;
    } else {
      result.fullname = this.fullname;
    }

    if (validator.validEmail(newUpdate.email)) {
      result.email = newUpdate.email;
    } else {
      result.email = this.email;
    }
    if (validator.validDOB(newUpdate.dob)) {
      result.dob = newUpdate.dob;
    } else {
      result.email = this.email;
    }
    result.gender = newUpdate.gender;
    result.location = newUpdate.location;
    result.about = newUpdate.about;
    result.avatar = newUpdate.avatar;
    return result;
  };

  return user_profile;
};
