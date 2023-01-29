const app = require("express");
const router = app.Router();
const userC = require("../controllers/user.c");
const passport = require("passport");

router
  .route("/login")
  .get(userC.renderHome, userC.getLogIn)
  .post(
    userC.renderHome,
    userC.validateLogIn,
    passport.authenticate("local", {
      failureRedirect: "/login",
    }),
    userC.postLogIn
  );

router
  .route("/signup")
  .get(userC.renderHome, userC.getSignUp)
  .post(userC.renderHome, userC.validateSignUp, userC.postSignUp);

router.post("/logout", userC.logOut);

module.exports = router;
