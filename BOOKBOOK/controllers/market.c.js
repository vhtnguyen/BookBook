const marketS = require("../services/marketServices");
const hbsHelpers = require("../helpers/hbs_helpers.js");
const userS = require("../services/userServices");
module.exports.renderMarketIndex = async (req, res) => {
  var adsData = await marketS.getAds();
  var itemData = await marketS.getList();
  const uProfile = await userS.getUserProfile(req.user.username);
  // console.log(itemData);

  res.render("market", {
    title: "Market | BookBook",
    user: uProfile,
    ads: adsData,
    itemList: itemData,
    helpers: hbsHelpers,
  });
};

module.exports.renderMarketMe = async (req, res) => {
  //   console.log(req.user);
  if (req.user.username !== undefined) {
    var itemList = await marketS.getOwnItem(req.user.username);
    const uProfile = await userS.getUserProfile(req.user.username);
    res.render("market_me", {
      title: "My Items | BookBook",
      user: uProfile,
      itemList: itemList,
      seller: req.user.profile.fullname,
      helpers: hbsHelpers,
    });
  } else {
    res.redirect("/login");
  }
};

module.exports.addNewItem = async (req, res, next) => {
  try {
    console.log(req.file);
    if (req.file && req.user.username) {
      let list = req.file.path.split("\\");
      req.body.img = list[list.length - 1];
      req.body.owner = req.user.username;
      const result = await marketS.addNewItem(req.body);
      next();
    } else {
      res.redirect("/market/me");
    }
  } catch (error) {
    next(error);
  }
};
