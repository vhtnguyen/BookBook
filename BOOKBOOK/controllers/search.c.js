const searchS = require("../services/searchServices");
const hbsHelpers = require("../helpers/hbs_helpers.js");
const userS = require("../services/userServices");
module.exports.searchPeople = async (req, res, next) => {
  var input = req.query.user;
  if (input === undefined || input.trim() === "") {
    res.redirect("/");
  } else {
    const result = await searchS.searchUser(input);
    const following = await userS.getFollowingList(req.user.username)
    console.log(following)
    res.render("search", {
      result: result,
      query: input,
      following: following,
      helpers: hbsHelpers,
      user: {
        username: req.user.username,
        permission: req.user.permission,
        avatar: req.user.profile.avatar,
      },
    });
  }
};

// module.exports.testRender = async (req, res) => {
//   const result = await searchS.searchUser("nguyen");
//   res.render("search", {
//     result: result,
//   });
// };
