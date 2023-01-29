const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userS = require("../services/userServices");

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user.username);
  });

  passport.deserializeUser(async (username, done) => {
    try {
      var user = await userS.getUserInfo(username);
      user.profile = await userS.getUserProfile(username);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });

  passport.use(
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true, // add more params
      },
      async (req, username, password, done) => {
        try {
          const checkLogin = await userS.checkLogin(username, password);

          if (checkLogin == -1) {
            req.session.errorUnMsg = "Username does not exist";
            return done(null, false);
          }
          if (checkLogin == 0) {
            req.session.errorPwMsg = "Wrong password";
            return done(null, false);
          }
          const user = await userS.getUserInfo(username);
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
};
