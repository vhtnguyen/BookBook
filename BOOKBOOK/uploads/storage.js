const multer = require("multer");
const avt_storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/avatar");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const post_storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/post");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const market_storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/market");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
module.exports.upload_avt = multer({ storage: avt_storage });
module.exports.upload_post = multer({ storage: post_storage });
module.exports.upload_market = multer({ storage: market_storage });
