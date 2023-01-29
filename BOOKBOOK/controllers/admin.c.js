const adminS = require("../services/adminServices");
const userS = require("../services/userServices");
const hbsHelpers = require("../helpers/hbs_helpers.js");

exports.checkPermission = async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      if (req.user.permission == 1) {
        next();
      } else if (req.user.permission == 0) {
        res.redirect("/");
      } else {
        res.redirect("/banned");
      }
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    next(error);
  }
};

exports.redirectAdmin = async (req, res, next) => {
  try {
    res.redirect("/admin/post");
  } catch (error) {
    next(error);
  }
};

exports.renderReportPost = async (req, res, next) => {
  try {
    const adminProf = await userS.getUserProfile(req.user.username);
    const rp_posts = await adminS.getAllReportPosts();

    res.render("report_post", {
      title: adminProf.fullname + " | BookBook",
      user: adminProf,
      layout: "admin",
      rp_posts: rp_posts,
      helpers: hbsHelpers,
      permission: req.user.permission,
    });
  } catch (error) {
    next(error);
  }
};

exports.renderReportUser = async (req, res, next) => {
  try {
    const adminProf = await userS.getUserProfile(req.user.username);
    const rp_users = await adminS.getAllReportUsers();

    res.render("report_user", {
      title: adminProf.fullname + " | BookBook",
      user: adminProf,
      layout: "admin",
      rp_users: rp_users,
      helpers: hbsHelpers,
      permission: req.user.permission,
    });
  } catch (error) {
    next(error);
  }
};

exports.getPost = async (req, res, next) => {
  try {
    const post = await adminS.getPost(req.query.post_id);
    res.send(JSON.stringify(post));
  } catch (error) {
    next(error);
  }
};

exports.skipUser = async (req, res, next) => {
  try {
    const result = await adminS.skipUser(req.body.data);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const result = await adminS.deleteUser(req.body.data);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

exports.skipPost = async (req, res, next) => {
  try {
    const result = await adminS.skipPost(req.body.data);
    console.log(req.body.data);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const result = await adminS.deleteGeneralPost(req.body.data);
    res.send(result);
  } catch (error) {
    next(error);
  }
};
