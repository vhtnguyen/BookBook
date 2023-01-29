const app = require("express");
const router = app.Router();
const adminC = require("../controllers/admin.c");

router
    .route('/')
    .all(adminC.checkPermission)
    .get(adminC.redirectAdmin)

router
    .route('/post')
    .get(adminC.checkPermission, adminC.renderReportPost)

router
    .route('/post/view')
    .get(adminC.checkPermission, adminC.getPost)

router
    .route('/post/skip')
    .post(adminC.checkPermission, adminC.skipPost)

router
    .route('/post/delete')
    .post(adminC.checkPermission, adminC.deletePost)

router
    .route('/user')
    .get(adminC.checkPermission, adminC.renderReportUser)

router
    .route('/user/skip')
    .post(adminC.checkPermission, adminC.skipUser)

router
    .route('/user/delete')
    .post(adminC.checkPermission, adminC.deleteUser)


module.exports = router;
