const userS = require("../services/userServices");
const hbsHelpers = require("../helpers/hbs_helpers.js");
const marketS = require("../services/marketServices");
const chalk = require("chalk");
const dayjs = require("dayjs");
dayjs().format();
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

exports.getFeed = async (req, res, next) => {
  try {
    if (req.user.permission == 1) {
      return res.redirect("/admin");
    }
    const uProfile = await userS.getUserProfile(req.user.username);
    const following = await userS.getFollowingList(req.user.username);
    // const allUser = await userS.getList();
    const liked = await userS.getLikedList(req.user.username);
    const suggestList = await userS.getSuggestList(req.user.username);
    var adsData = await marketS.getAds();
    adsData = adsData.slice(0, 4);
    let suggested = [];
    suggestList.forEach((a_user) => {
      suggested.push({
        avatar: a_user.avatar,
        name: a_user.fullname,
        username: a_user.username,
        state: "Follow",
      });
    });

    // for (let i = 0; i < allUser.length; i++) {
    //   // check if this user is admin
    //   const a_user_info = await userS.getUserInfo(allUser[i].username);
    //   if (a_user_info.permission == 1) {
    //     continue;
    //   }
    //   const a_user = await userS.getUserProfile(allUser[i].username);

    //   if (suggested.length > 4) break;
    //   const is_following = await userS.isFollowing(
    //     req.user.username,
    //     a_user.username
    //   );
    //   let state = "Follow";
    //   if (is_following) state = "Unfollow";
    //   if (uProfile.username != a_user.username)
    //     suggested.push({
    //       avatar: a_user.avatar,
    //       name: a_user.fullname,
    //       username: a_user.username,
    //       state: state,
    //     });
    // }

    let item = [];
    const my_post = await userS.getAllMyNewestPosts(req.user.username);
    for (let j = 0; j < my_post.length; j++) {
      if (j == 3) break;
      let time = "";
      if (
        dayjs().get("date") !=
        dayjs(my_post[j].dataValues.date_post).get("date")
      )
        time = dayjs(my_post[j].dataValues.date_post).format("H:mm DD/MM/YYYY");
      else time = dayjs(my_post[j].dataValues.date_post).fromNow(true);

      let like_active = "";
      for (let k = 0; k < liked.length; k++) {
        if (my_post[j].dataValues.post_id == liked[k].dataValues.react_on)
          like_active = "active-like";
      }

      let current_post = my_post[j].dataValues.post_id;
      const cmt_list = await userS.getCommentedListOfPost(current_post);
      let cmts = [];
      for (let c = 0; c < cmt_list.length; c++) {
        const byUser = await userS.getUserProfile(
          cmt_list[c].dataValues.cmt_by
        );
        cmts.push({
          avatar: byUser.avatar,
          name: byUser.fullname,
          comment: cmt_list[c].dataValues.text,
        });
      }

      item.push({
        username: uProfile.username,
        name: uProfile.fullname,
        avatar: uProfile.avatar,
        id: my_post[j].dataValues.post_id,
        date: time,
        img: my_post[j].dataValues.img,
        content: my_post[j].dataValues.text,
        active: like_active,
        comment: cmts,
      });
    }
    // console.log(following[0]);
    for (let i = 0; i < following.length; i++) {
      if (i == 12) break;
      const username_of_following =
        following[i].dataValues.usr_followed_user_profile.dataValues.username;
      const posts_info = await userS.getAllMyNewestPosts(username_of_following);

      for (let j = 0; j < posts_info.length; j++) {
        let time = "";
        if (
          dayjs().get("date") !=
          dayjs(posts_info[j].dataValues.date_post).get("date")
        )
          time = dayjs(posts_info[j].dataValues.date_post).format(
            "H:mm DD/MM/YYYY"
          );
        else time = dayjs(posts_info[j].dataValues.date_post).fromNow(true);

        let like_active = "";
        for (let k = 0; k < liked.length; k++) {
          if (posts_info[j].dataValues.post_id == liked[k].dataValues.react_on)
            like_active = "active-like";
        }

        let current_post = posts_info[j].dataValues.post_id;
        const cmt_list = await userS.getCommentedListOfPost(current_post);
        let cmts = [];
        for (let c = 0; c < cmt_list.length; c++) {
          const byUser = await userS.getUserProfile(
            cmt_list[c].dataValues.cmt_by
          );
          cmts.push({
            avatar: byUser.avatar,
            name: byUser.fullname,
            comment: cmt_list[c].dataValues.text,
          });
        }

        item.push({
          username: username_of_following,
          name: following[i].dataValues.usr_followed_user_profile.dataValues
            .fullname,
          avatar:
            following[i].dataValues.usr_followed_user_profile.dataValues.avatar,
          id: posts_info[j].dataValues.post_id,
          date: time,
          img: posts_info[j].dataValues.img,
          content: posts_info[j].dataValues.text,
          active: like_active,
          comment: cmts,
        });
      }
    }
    item.sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(b.date) - new Date(a.date);
    });
    // console.log(item);
    res.render("feed", {
      title: "BookBook",
      user: uProfile,
      helpers: hbsHelpers,
      item: item,
      person: suggested,
      ads: adsData,
    });
  } catch (error) {
    next(error);
  }
};

exports.checkPermission = async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      if (req.user.permission == -1) {
        return res.redirect("/banned");
      }
      next();
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    next(error);
  }
};

exports.handleMyProfile = async (req, res, next) => {
  try {
    if (
      req.user.username === req.query.username ||
      req.query.username === undefined
    ) {
      if (req.user.permission == 1) {
        return res.redirect("/admin");
      }
      const myProfile = await userS.getUserProfile(req.user.username);
      const followers = await userS.getFollowersList(req.user.username, 5);
      const following = await userS.getFollowingList(req.user.username, 5);
      const posts = await userS.getAllMyNewestPosts(req.user.username);
      const liked = await userS.getLikedList(req.user.username);

      for (let j = 0; j < posts.length; j++) {
        for (let k = 0; k < liked.length; k++) {
          if (posts[j].dataValues.post_id == liked[k].dataValues.react_on) {
            Object.assign(posts[j].dataValues, { liked: "active-like" });
          }
        }
      }

      res.render("profile", {
        title: myProfile.fullname + " | BookBook",
        user: myProfile,
        userViewed: myProfile,
        followers: followers,
        following: following,
        followedByUser: following,
        helpers: hbsHelpers,
        post: posts,
      });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

exports.checkOtherPermission = async (req, res, next) => {
  try {
    const otherInfo = await userS.getUserInfo(req.query.username);
    // if going to profile page of a valid user
    if (otherInfo.permission == 0) {
      next();
    }
    // if going to profile page of an admin
    if (otherInfo.permission == 1) {
      res.redirect("/");
    }
    // if going to profile page of a blocked user
    if (otherInfo.permission == -1) {
      res.redirect("/404");
    }
  } catch (error) {
    next(error);
  }
};

exports.handleOtherProfile = async (req, res, next) => {
  try {
    const myProfile = await userS.getUserProfile(req.user.username);
    const otherProfile = await userS.getUserProfile(req.query.username);
    const followers = await userS.getFollowersList(req.query.username);
    const following = await userS.getFollowingList(req.query.username);
    const followedByUser = await userS.getFollowingList(req.user.username);
    const posts = await userS.getAllPosts(req.query.username);
    const liked = await userS.getLikedList(req.user.username);

    for (let j = 0; j < posts.length; j++) {
      for (let k = 0; k < liked.length; k++) {
        if (posts[j].dataValues.post_id == liked[k].dataValues.react_on) {
          Object.assign(posts[j].dataValues, { liked: "active-like" });
        }
      }
    }

    res.render("profile", {
      title: otherProfile.fullname + " | BookBook",
      user: myProfile,
      userViewed: otherProfile,
      followers: followers,
      following: following,
      followedByUser: followedByUser,
      helpers: hbsHelpers,
      post: posts,
      permission: req.user.permission,
    });
  } catch (error) {
    next(error);
  }
};

exports.checkOwner = async (req, res, next) => {
  try {
    if (req.user.username) {
      next();
    } else {
      res.status(403).redirect("/error");
    }
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    if (req.file) {
      let list = req.file.path.split("\\");
      req.body.avatar = list[list.length - 1];
    }
    const result = await userS.updateProfile(req.user.username, req.body);
    res.redirect("/profile");
  } catch (error) {
    next(error);
  }
};

exports.followUser = async (req, res, next) => {
  try {
    const user_to_follow_info = await userS.getUserInfo(
      req.body.user_to_follow
    );
    // console.log(req.body);
    if (user_to_follow_info.permission == 0) {
      const result = await userS.startFollow(
        req.user.username,
        req.body.user_to_follow
      );
      if (result) {
        return res.send(JSON.stringify({ result: 1 }));
      }
    }
    res.send(JSON.stringify({ result: 0 }));
  } catch (error) {
    next(error);
  }
};

exports.unfollowUser = async (req, res, next) => {
  try {
    // console.log(req.user.username);
    // console.log(req.body.user_to_unfollow);
    const user_to_unfollow_info = await userS.getUserInfo(
      req.body.user_to_unfollow
    );
    if (user_to_unfollow_info.permission == 0) {
      const result = await userS.unfollow(
        req.user.username,
        req.body.user_to_unfollow
      );
      if (result) {
        return res.send(JSON.stringify({ result: 1 }));
      }
    }
    res.send(JSON.stringify({ result: 0 }));
  } catch (error) {
    next(error);
  }
};

exports.getPostView = async (req, res, next) => {
  try {
    const index = req.body.view;
    // const user = req.body.user;
    const post_view = await userS.getPostByID(index);
    // const post_view = posts[index];

    let current_post = post_view.dataValues.post_id;
    const cmt_list = await userS.getCommentedListOfPost(current_post);
    let cmts = [];
    for (let c = 0; c < cmt_list.length; c++) {
      const byUser = await userS.getUserProfile(cmt_list[c].dataValues.cmt_by);
      cmts.push({
        avatar: byUser.avatar,
        name: byUser.fullname,
        comment: cmt_list[c].dataValues.text,
      });
    }

    res.json({
      img: post_view.dataValues.img,
      content: post_view.dataValues.text,
      cmt: cmts,
    });
  } catch (error) {
    next(error);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const index = req.body.view;
    // const posts = await userS.getAllPosts(req.user.username);
    // const delete_post = posts[index];
    // const del_post_id = delete_post.post_id;
    await userS.deleteOnWall(index);
    res.json({ status: "success" });
  } catch (error) {
    next(error);
  }
};

exports.reportPost = async (req, res, next) => {
  try {
    // const index = req.body.view;
    // const posts = await userS.getAllPosts(req.user.username);
    // const post_reported = posts[index];
    const postid = req.body.postid;
    const reason = req.body.reason;
    let result = 0;
    if (await userS.reportPost(postid, reason)) {
      result = 1;
    }
    res.send(JSON.stringify({ result: result }));
    // await userS.reportPost(postid, reason);
    // res.json({ status: "success" });
  } catch (error) {
    next(error);
  }
};

exports.reportUser = async (req, res, next) => {
  try {
    const username = req.body.username;
    const reason = req.body.reason;
    let result = 0;
    if (await userS.reportUser(username, reason)) {
      result = 1;
    }
    res.send(JSON.stringify({ result: result }));
  } catch (error) {
    next(error);
  }
};

exports.likePost = async (req, res, next) => {
  try {
    const user = req.body.user == null ? req.user.username : req.body.user;
    let interactive_post;
    if (req.body.view == null) interactive_post = req.body.post;
    else {
      const index = req.body.view;
      const posts = await userS.getAllPosts(user);
      const post_view = posts[index];
      interactive_post = post_view.dataValues.post_id;
    }
    const data = {
      post_id: interactive_post,
      username: req.user.username,
    };
    const result = await userS.like(data);
    if (result == 1) res.send(JSON.stringify({ result: "like" }));
    else {
      if (result == -1) res.send(JSON.stringify({ result: "unlike" }));
    }
  } catch (error) {
    next(error);
  }
};

exports.commentPost = async (req, res, next) => {
  try {
    const user = req.body.user == null ? req.user.username : req.body.user;
    let interactive_post;
    if (req.body.index == null) interactive_post = req.body.post;
    else {
      const index = req.body.index;
      const posts = await userS.getAllPosts(user);
      const post_view = posts[index];
      interactive_post = post_view.dataValues.post_id;
    }
    const cmt = {
      username: req.user.username,
      text: req.body.content,
      post_id: interactive_post,
    };
    await userS.comment(cmt);
    res.send(
      JSON.stringify({
        avatar: req.user.profile.avatar,
        name: req.user.profile.fullname,
      })
    );
  } catch (error) {
    next(error);
  }
};

exports.deletePostAtFeed = async (req, res, next) => {
  try {
    if (await userS.deleteOnWall(req.body.postid)) {
      res.send(JSON.stringify({ result: 1 }));
    } else {
      res.send(JSON.stringify({ result: 0 }));
    }
  } catch (error) {
    next(error);
  }
};
