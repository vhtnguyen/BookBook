const seq = require("../database/db");
const adsData = require("../database/top-sell.json");
const models = seq.models;

const marketServices = {
  //get all user in database
  getList: async () => {
    try {
      const result = await models.market_post.findAll({
        raw: true,
      });
      return result;
    } catch (err) {
      console.error(err + "\nerror when get market item list\n");
      return "error";
    }
  },
  getAds: async () => {
    var ads = await adsData;
    return ads;
  },
  getOwnItem: async (username) => {
    try {
      const res = await models.market_post.findAll({
        raw: true,
        where: {
          post_by: username,
        },
      });
      return res;
    } catch (err) {
      console.error(err + `\nerror when get list item of user${username}\n`);
      return "error";
    }
  },
  addNewItem: async (item) => {
    try {
      const res = await models.market_post.create({
        img: item.img,
        text: item.description,
        price: item.price,
        title: item.title,
        post_by: item.owner,
      });
      console.log(`Add new item by ${item.username}\n `);
      return true;
    } catch (err) {
      console.log(`raise error when add new item by ${item.username}\n `);
      console.log(err);
      return false;
    }
  },
};

module.exports = marketServices;
