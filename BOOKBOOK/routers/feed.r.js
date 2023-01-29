const app = require("express");
const router = app.Router();
const userActionC = require("../controllers/userAction.c");

router.get("/", userActionC.checkPermission, userActionC.getFeed);

router.post("/like", userActionC.likePost);

router.post("/comment", userActionC.commentPost);

router.post("/report_post", userActionC.reportPost);

router.post("/report_user", userActionC.reportUser);

router.post("/delete_post", userActionC.deletePostAtFeed);

module.exports = router;
