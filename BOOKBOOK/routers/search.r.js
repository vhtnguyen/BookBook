const app = require("express");
const router = app.Router();
const searchCtrl = require("../controllers/search.c");
const userCtrl = require("../controllers/userAction.c");

//router;
// .route("/")
// .all(userCtrl.checkPermission)
// .get(marketCtrl.renderMarketIndex);

router
  .route("/user")
  .all(userCtrl.checkPermission)
  .get(searchCtrl.searchPeople);

module.exports = router;
