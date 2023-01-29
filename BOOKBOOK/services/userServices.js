const seq = require("../database/db");
const models = seq.models;
const bcrypt = require("bcrypt");
const saltRounds = 10;
const sequelize = seq.sequelize;
const { QueryTypes } = require("sequelize");
const userServices = {
  //get all user in database
  getList: async () => {
    try {
      const result = await models.user_info.findAll({
        raw: true,
      });
      return result;
    } catch (err) {
      console.error(err + "\nerror when get users list\n");
      return "error";
    }
  },

  //login signup services
  checkExistUser: async (username) => {
    const result = await models.user_info.findByPk(username);
    if (result === null) {
      return false;
    } else {
      return true;
    }
  },
  checkAdmin: async (username) => {
    const result = await models.user_info.findByPk(username, {
      attributes: ["permission"],
    });
    if (result === null || result.admin !== 1) {
      return false;
    } else {
      return true;
    }
  },
  createHash: async (plain_text) => {
    return await bcrypt.hash(plain_text, saltRounds);
  },
  checkLogin: async (username, pw) => {
    const result = await models.user_info.findByPk(username, {
      attributes: ["pwd"],
    });
    if (result !== null) {
      const dbpw = result.dataValues.pwd;
      const cmp = await bcrypt.compare(pw, dbpw);

      // if username and password match
      if (cmp) {
        return 1;
      }
      // if password doesn't match
      else {
        return 0;
      }
    }
    // if username doesn't exist
    else {
      return -1;
    }
  },
  createNewUser: async (user) => {
    const pwHashed = await module.exports.createHash(user.password);
    const keyHashed = await module.exports.createHash(user.secretkey);
    try {
      const result = await models.user_info.create({
        username: user.username,
        pwd: pwHashed,
        secret_key: keyHashed,
      });
      console.log(`created new user info of ${user.username} successfully\n`);
      return await userServices.createDefaultProfile(user);
    } catch (err) {
      console.log(
        `raise error when create new user info of ${user.username}\n` + err
      );
      return false;
    }
  },
  createDefaultProfile: async (user) => {
    try {
      const result = await models.user_profile.create({
        username: user.username,
        fullname: user.fullname,
        email: user.email,
        gender: user.gender,
        dob: user.dob,
      });
      console.log(
        `created new default profile of ${user.username} successfully\n`
      );
      return true;
    } catch (err) {
      console.log(
        `raise error when create new default profile of ${user.username}\n` +
          err
      );
      return false;
    }
  },
  getUserInfo: async (username) => {
    try {
      const result = await models.user_info.findByPk(username);
      return result.dataValues;
    } catch (err) {
      return null;
    }
  },
  getUserProfile: async (username) => {
    try {
      const result = await models.user_profile.findByPk(username);
      return result.dataValues;
    } catch (err) {
      return null;
    }
  },

  //profile services
  getFollowersList: async (username, limit = 50) => {
    const result = await models.follow.findAll({
      attributes: ["usr_follow"],
      distinct: false,
      limit: limit,
      include: [
        {
          model: models.user_profile,
          required: true,
          as: "usr_follow_user_profile",
          attributes: ["username", "fullname", "avatar"],
        },
      ],
      where: {
        usr_followed: username,
      },
    });
    return result;
  },
  countFollowers: async (username) => {
    const result = await models.follow.count({
      distinct: false,
      where: {
        usr_followed: username,
      },
    });
    return result;
  },
  getFollowingList: async (username, limit = 50) => {
    const result = await models.follow.findAll({
      attributes: ["usr_followed"],
      distinct: false,
      limit: limit,
      include: [
        {
          model: models.user_profile,
          required: true,
          as: "usr_followed_user_profile",
          attributes: ["username", "fullname", "avatar"],
        },
      ],
      where: {
        usr_follow: username,
      },
    });
    return result;
  },
  isFollowing: async (me, they) => {
    const result = await models.follow.findAll({
      attributes: ["usr_followed"],
      distinct: false,
      include: [
        {
          model: models.user_profile,
          required: true,
          as: "usr_followed_user_profile",
          attributes: ["username", "fullname", "avatar"],
        },
      ],
      where: {
        usr_follow: me,
        usr_followed: they,
      },
    });
    if (result == null || result.length == 0) return false;
    return true;
  },
  countFollowing: async (username) => {
    const result = await models.follow.count({
      distinct: false,
      where: {
        usr_follow: username,
      },
    });
    return result;
  },
  getLibrary: async (username) => {
    const result = await models.user_wall.findAll({
      include: {
        model: models.general_post,
        required: true,
      },
      raw: true,
      where: {
        username: username,
      },
    });
    return result;
  },
  updateProfile: async (user, newUpdate) => {
    if (await userServices.checkExistUser(user)) {
      try {
        const result = await models.user_profile.update(
          {
            fullname: newUpdate.fullname,
            gender: newUpdate.gender,
            location: newUpdate.location,
            about: newUpdate.about,
            avatar: newUpdate.avatar,
          },
          {
            where: {
              username: user,
            },
          }
        );
      } catch (err) {
        console.log(`raise error when update user ${user} profile\n`);
        return false;
      }
      console.log(`updated user ${user} profile successfully\n`);
      return true;
    } else {
      console.log(`user ${user} is not exist\n`);
      return false;
    }
  },
  getAllPosts: async (username) => {
    const result = await models.general_post.findAll({
      where: {
        author_username: username,
      },
    });
    return result;
  },
  getPostByID: async (id) => {
    const result = await models.general_post.findByPk(id);
    return result;
  },
  getAllMyNewestPosts: async (username) => {
    const result = await models.general_post.findAll({
      where: {
        author_username: username,
      },
      order: [["date_post", "DESC"]],
    });
    return result;
  },
  //get all post of user and who user following order by latest time
  getNewestFeed: async (username) => {
    const result = await sequelize.query(
      "select * from general_post,follow where author_username= $1 or (usr_follow= $1 and usr_followed=author_username) limit 20",
      { bind: [username], raw: true, type: QueryTypes.SELECT }
    );
    return result;
  },
  getSuggestList: async (username) => {
    const result = await sequelize.query(
      "select * from user_profile as user2,user_profile as user1 where user2.username = $1 and not exists( select * from user_info where user_info.username=user1.username and user_info.permission=1 ) and not exists(select * from follow where follow.usr_followed=user1.username and follow.usr_follow=user2.username )and user1.username!=user2.username limit 5",
      { bind: [username], raw: true, type: QueryTypes.SELECT }
    );
    return result;
  },
  postOnWall: async (data) => {
    try {
      const post = await models.general_post.create({
        author_username: data.username,
        img: data.img,
        text: data.content,
      });
      const reslt = await models.user_wall.create({
        username: post.author_username,
        post_id: post.post_id,
      });
      console.log(`posted on ${username} wall\n`);
      return true;
    } catch (err) {
      console.log(`raise error when post on ${username} wall\n `);
      console.log(err);
      return false;
    }
  },
  deleteOnWall: async (postID) => {
    try {
      const delReaction = await models.reaction.destroy({
        where: {
          react_on: postID,
        },
      });
      const delCmt = await models.general_comment.destroy({
        where: {
          cmt_on: postID,
        },
      });
      const delOnWall = await models.user_wall.destroy({
        where: {
          post_id: postID,
        },
      });
      const delPost = await models.general_post.destroy({
        where: {
          post_id: postID,
        },
      });

      console.log(`deleted post${postID} on wall\n`);
      return true;
    } catch (err) {
      console.log(`raise error when delete post ${postID} on wall\n `);
      console.log(err);
      return false;
    }
  },
  comment: async (cmt) => {
    try {
      const result = await models.general_comment.create({
        cmt_by: cmt.username,
        cmt_on: cmt.post_id,
        text: cmt.text,
      });
      console.log(`comment on post ${cmt.post_id}\n`);
      return true;
    } catch (err) {
      console.log(`raise error when omment on post ${cmt.post_id}\n `);
      console.log(err);
      return false;
    }
  },
  getCommentedListOfPost: async (post_id) => {
    try {
      const result = await models.general_comment.findAll({
        where: {
          cmt_on: post_id,
        },
      });
      return result;
    } catch (err) {
      console.log(`raise error when get comment list of post ${post_id}\n `);
      console.log(err);
      return false;
    }
  },
  like: async (data) => {
    try {
      const liked = await models.reaction.findAll({
        where: {
          react_by: data.username,
          react_on: data.post_id,
        },
      });
      if (liked == null || liked.length == 0) {
        const result = await models.reaction.create({
          react_by: data.username,
          react_on: data.post_id,
          react_type: 1,
        });
        console.log(`like on post ${data.post_id}\n`);
        return 1;
      } else {
        const result = await models.reaction.destroy({
          where: {
            react_by: data.username,
            react_on: data.post_id,
          },
        });
        console.log(`unlike on post ${data.post_id}\n`);
        return -1;
      }
    } catch (err) {
      console.log(`raise error when like on post ${data.post_id}\n `);
      console.log(err);
      return false;
    }
  },
  getLikedList: async (user) => {
    try {
      const result = await models.reaction.findAll({
        where: {
          react_by: user,
        },
      });
      return result;
    } catch (err) {
      console.log(`raise error when get liked list of ${user}\n `);
      console.log(err);
      return false;
    }
  },

  // report
  reportPost: async (post_id, reason) => {
    try {
      const result = await models.reported_post.create({
        post_id: post_id,
        reason: reason,
      });
      console.log(`report post ${post_id}\n`);
      return true;
    } catch (err) {
      console.log(`raise error when report post ${post_id}\n `);
      console.log(err);
      return false;
    }
  },
  reportUser: async (username, reason) => {
    try {
      const result = await models.reported_user.create({
        reported_user: username,
        reason: reason,
      });
      console.log(`report user ${username}\n`);
      return true;
    } catch (err) {
      console.log(`raise error when report user ${username}\n `);
      console.log(err);
      return false;
    }
  },

  //interact services
  startFollow: async (follower, followed) => {
    if (
      (await userServices.checkExistUser(follower)) &&
      (await userServices.checkExistUser(followed))
    ) {
      try {
        const result = await models.follow.create({
          usr_follow: follower,
          usr_followed: followed,
        });
        console.log(`${follower} start following ${followed}\n`);
        return true;
      } catch (err) {
        console.log(`raise error when start follow\n`);
        return false;
      }
    } else {
      console.log(`user is not exist\n`);
      return false;
    }
  },
  unfollow: async (follower, followed) => {
    if (
      (await userServices.checkExistUser(follower)) &&
      (await userServices.checkExistUser(followed))
    ) {
      try {
        const result = await models.follow.destroy({
          where: {
            usr_follow: follower,
            usr_followed: followed,
          },
        });
        console.log(`${follower} unfollow ${followed}\n`);
        return true;
      } catch (err) {
        console.log(`raise error when unfollow\n`);
        return false;
      }
    } else {
      console.log(`user is not exist\n`);
      return false;
    }
  },
};

module.exports = userServices;
