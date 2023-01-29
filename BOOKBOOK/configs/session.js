const session = require("express-session");
const config = require("./config");
module.exports = function (app) {
  app.use(
    session({
      resave: true,
      saveUninitialized: true,
      secret: config.SESSION_SECRETKEY,
      cookie: {
        maxAge: config.COOKIE_MAXAGE,
        secure: false,
      },
    })
  );
};
