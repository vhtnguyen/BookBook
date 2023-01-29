const app = require("express");
const router = app.Router();
const userC = require("../controllers/user.c");

router.route("/").get(userC.renderHome, (req, res) => {
  res.status(403).render("banned", { layout: "base" });
});

module.exports = router;
