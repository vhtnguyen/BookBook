const app = require("express");
const upload_avt = require("../uploads/storage").upload_avt;
const router = app.Router();
const userActionC = require("../controllers/userAction.c");

router
  .route("/")
  .all(userActionC.checkPermission)
  .get(userActionC.handleMyProfile, userActionC.checkOtherPermission, userActionC.handleOtherProfile);

router
  .route("/edit")
  .post(upload_avt.single("avatar"), userActionC.updateProfile);

router.route("/follow").post(userActionC.followUser);

router.route("/unfollow").post(userActionC.unfollowUser);

router.route("/view").post(userActionC.getPostView);

router.route("/deletePost").post(userActionC.deletePost);

module.exports = router;
