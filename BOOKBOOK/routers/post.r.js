const app = require("express");
const router = app.Router();
const { upload_post } = require("../uploads/storage");
const postC = require("../controllers/post.c");

router.route("/newpost").post(upload_post.single("img_upload"), postC.savePost);

module.exports = router;
