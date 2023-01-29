const userS = require("../services/userServices");
const validator = require("../services/helperServices");
exports.getLogIn = (req, res, next) => {
  try {
    // render error message if user failed to log in
    errorUnMsg = "";
    errorPwMsg = "";
    if (req.session.errorUnMsg) {
      errorUnMsg = req.session.errorUnMsg;
    }
    if (req.session.errorPwMsg) {
      errorPwMsg = req.session.errorPwMsg;
    }
    delete req.session.errorUnMsg;
    delete req.session.errorPwMsg;

    res.render("login", {
      title: "Log In | BookBook",
      layout: "account.hbs",
      errorUnMsg: errorUnMsg,
      errorPwMsg: errorPwMsg,
    });
  } catch (error) {
    next(error);
  }
};

exports.getSignUp = (req, res, next) => {
  try {
    res.render("signup", {
      title: "Sign Up | BookBook",
      layout: "account.hbs",
    });
  } catch (error) {
    next(error);
  }
};

exports.postLogIn = async (req, res, next) => {
  // if this is admin account
  if (req.user.permission == 1) {
    res.redirect("/admin");
  }
  // if this is user account
  else if (req.user.permission == 0) {
    res.redirect("/");
  }
  // if account has been blocked
  else {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
    });
    res.redirect("/banned");
  }
};

exports.validateLogIn = async (req, res, next) => {
  try {
    if (
      !validator.validUserName(req.body.username) ||
      !validator.validPassword(req.body.password)
    ) {
      res.redirect("/login");
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

exports.validateSignUp = async (req, res, next) => {
  try {
    switch (req.body.todo) {
      case "checkusername": {
        if (!validator.validUserName(req.body.username)) {
          res.send(JSON.stringify({ result: 0 }));
        } else {
          next();
        }

        break;
      }
      case "signup": {
        if (
          !validator.validUserName(req.body.username) ||
          !validator.validPassword(req.body.password) ||
          !validator.validFullName(req.body.fullname) ||
          !validator.validEmail(req.body.email) ||
          !validator.validDOB(req.body.dob)
        ) {
          res.send(JSON.stringify({ result: 0 }));
        } else {
          next();
        }

        break;
      }
    }
  } catch (err) {
    next(err);
  }
};

exports.postSignUp = async (req, res, next) => {
  try {
    switch (req.body.todo) {
      // check if username already exists
      case "checkusername": {
        const isExist = await userS.checkExistUser(req.body.username);

        if (isExist) {
          res.send(JSON.stringify({ result: 0 }));
        } else {
          res.send(JSON.stringify({ result: 1 }));
        }

        break;
      }

      // user sign up
      case "signup": {
        const user = {
          username: req.body.username,
          password: req.body.password,
          fullname: req.body.fullname,
          dob: req.body.dob,
          email: req.body.email,
          gender: req.body.gender,
          secretkey: req.body.secretkey,
        };
        const createNewUser = await userS.createNewUser(user);

        // if sign up successfully
        if (createNewUser) {
          res.send(JSON.stringify({ result: 1 }));
        }
        // if error
        else {
          res.send(JSON.stringify({ result: 0 }));
        }
      }
    }
  } catch (err) {
    next(err);
  }
};

exports.logOut = (req, res, next) => {
  if (req.isAuthenticated()) {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
    });
  }
  res.redirect("/login");
};

exports.renderHome = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    next();
  }
};
