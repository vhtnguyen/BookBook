const seq = require("../database/db");
const models = seq.models;
const { Op } = require("sequelize");
const Sequelize = seq.sequelize;
const searchServices = {
  searchUser: async (input) => {
    try {
      const result = await models.user_profile.findAll({
        raw: true,
        attributes: { exclude: ["searchable"] },
        where: {
          searchable: {
            [Op.match]: Sequelize.fn("to_tsquery", `${input}`),
          },
        },
      });
      return result;
    } catch (err) {
      console.error(err + `\nerror when searching ${input}\n`);
      return "error";
    }
  },
};

module.exports = searchServices;
