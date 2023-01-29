const seq = require("../database/db");
const models = seq.models;

const savePost = async (user, post) => {
  try {
    models.general_post.create({
      author_username: user.username,
      img: post.img,
      text: post.content,
    });
  } catch (err) {
    console.log(`raise error when save post` + err);
    return false;
  }
};

module.exports = {
  savePost: savePost,
};
