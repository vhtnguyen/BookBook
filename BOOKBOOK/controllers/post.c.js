const postS = require("../services/postServices");

exports.savePost = async (req, res, next) => {
  try {
    let list = req.file.path.split("\\");
    req.body.img = list[list.length - 1];
    await postS.savePost(req.user, req.body);
    res.redirect("/profile");
  } catch (error) {
    next(error);
  }
};
