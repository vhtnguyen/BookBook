const app = require("express");
const upload_market = require("../uploads/storage").upload_market;
const router = app.Router();
const marketCtrl = require("../controllers/market.c");
const userCtrl = require("../controllers/userAction.c");
router
  .route("/")
  .all(userCtrl.checkPermission)
  .get(marketCtrl.renderMarketIndex);

router
  .route("/me")
  .all(userCtrl.checkPermission)
  .get(marketCtrl.renderMarketMe)
  .post(
    upload_market.single("item-img"),
    marketCtrl.addNewItem,
    marketCtrl.renderMarketMe
  );

module.exports = router;
