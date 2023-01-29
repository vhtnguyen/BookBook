var DataTypes = require("sequelize").DataTypes;
const _follow = require("./follow");
const _general_comment = require("./general_comment");
const _general_post = require("./general_post");
const _group_info = require("./group_info");
const _group_member = require("./group_member");
const _group_wall = require("./group_wall");
const _market_comment = require("./market_comment");
const _market_post = require("./market_post");
const _reaction = require("./reaction");
const _user_blocked = require("./user_blocked");
const _user_info = require("./user_info");
const _user_profile = require("./user_profile");
const _user_wall = require("./user_wall");
const _reported_group = require("./reported_group");
const _reported_user = require("./reported_user");
const _reported_post = require("./reported_post");
const _group_reported_member = require("./group_reported_member");
const _group_reported_post = require("./group_reported_post");

function initModels(sequelize) {
  var follow = _follow(sequelize, DataTypes);
  var general_comment = _general_comment(sequelize, DataTypes);
  var general_post = _general_post(sequelize, DataTypes);
  var group_info = _group_info(sequelize, DataTypes);
  var group_member = _group_member(sequelize, DataTypes);
  var group_wall = _group_wall(sequelize, DataTypes);
  var market_comment = _market_comment(sequelize, DataTypes);
  var market_post = _market_post(sequelize, DataTypes);
  var reaction = _reaction(sequelize, DataTypes);
  var user_blocked = _user_blocked(sequelize, DataTypes);
  var user_info = _user_info(sequelize, DataTypes);
  var user_profile = _user_profile(sequelize, DataTypes);
  var user_wall = _user_wall(sequelize, DataTypes);
  var reported_group = _reported_group(sequelize, DataTypes);
  var reported_user = _reported_user(sequelize, DataTypes);
  var reported_post = _reported_post(sequelize, DataTypes);
  var group_reported_member = _group_reported_member(sequelize, DataTypes);
  var group_reported_post = _group_reported_post(sequelize, DataTypes);

  general_post.belongsToMany(group_info, {
    as: "group_id_group_info_group_walls",
    through: group_wall,
    foreignKey: "post_id",
    otherKey: "group_id",
  });
  general_post.belongsToMany(user_info, {
    as: "username_user_info_user_walls",
    through: user_wall,
    foreignKey: "post_id",
    otherKey: "username",
  });
  general_post.belongsToMany(user_profile, {
    as: "react_by_user_profiles",
    through: reaction,
    foreignKey: "react_on",
    otherKey: "react_by",
  });
  group_info.belongsToMany(general_post, {
    as: "post_id_general_posts",
    through: group_wall,
    foreignKey: "group_id",
    otherKey: "post_id",
  });
  group_info.belongsToMany(user_profile, {
    as: "username_user_profiles",
    through: group_member,
    foreignKey: "group_id",
    otherKey: "username",
  });
  user_info.belongsToMany(general_post, {
    as: "post_id_general_post_user_walls",
    through: user_wall,
    foreignKey: "username",
    otherKey: "post_id",
  });
  user_info.belongsToMany(user_profile, {
    as: "user_blocked_user_profiles",
    through: user_blocked,
    foreignKey: "username",
    otherKey: "user_blocked",
  });
  user_profile.belongsToMany(general_post, {
    as: "react_on_general_posts",
    through: reaction,
    foreignKey: "react_by",
    otherKey: "react_on",
  });
  user_profile.belongsToMany(group_info, {
    as: "group_id_group_infos",
    through: group_member,
    foreignKey: "username",
    otherKey: "group_id",
  });
  user_profile.belongsToMany(user_info, {
    as: "username_user_infos",
    through: user_blocked,
    foreignKey: "user_blocked",
    otherKey: "username",
  });
  user_profile.belongsToMany(user_profile, {
    as: "usr_follow_user_profiles",
    through: follow,
    foreignKey: "usr_followed",
    otherKey: "usr_follow",
  });
  user_profile.belongsToMany(user_profile, {
    as: "usr_followed_user_profiles",
    through: follow,
    foreignKey: "usr_follow",
    otherKey: "usr_followed",
  });
  general_comment.belongsTo(general_post, {
    as: "cmt_on_general_post",
    foreignKey: "cmt_on",
  });
  general_post.hasMany(general_comment, {
    as: "general_comments",
    foreignKey: "cmt_on",
  });
  group_wall.belongsTo(general_post, { as: "post", foreignKey: "post_id" });
  general_post.hasMany(group_wall, {
    as: "group_walls",
    foreignKey: "post_id",
  });
  reaction.belongsTo(general_post, {
    as: "react_on_general_post",
    foreignKey: "react_on",
  });
  general_post.hasMany(reaction, { as: "reactions", foreignKey: "react_on" });
  user_wall.belongsTo(general_post, { as: "post", foreignKey: "post_id" });
  general_post.hasMany(user_wall, {
    as: "user_walls",
    foreignKey: "post_id",
  });
  group_member.belongsTo(group_info, { as: "group", foreignKey: "group_id" });
  group_info.hasMany(group_member, {
    as: "group_members",
    foreignKey: "group_id",
  });
  group_wall.belongsTo(group_info, { as: "group", foreignKey: "group_id" });
  group_info.hasMany(group_wall, {
    as: "group_walls",
    foreignKey: "group_id",
  });
  market_comment.belongsTo(market_post, {
    as: "cmt_on_market_post",
    foreignKey: "cmt_on",
  });
  market_post.hasMany(market_comment, {
    as: "market_comments",
    foreignKey: "cmt_on",
  });
  user_blocked.belongsTo(user_info, {
    as: "username_user_info",
    foreignKey: "username",
  });
  user_info.hasMany(user_blocked, {
    as: "user_blockeds",
    foreignKey: "username",
  });
  user_profile.belongsTo(user_info, {
    as: "username_user_info",
    foreignKey: "username",
  });
  user_info.hasOne(user_profile, {
    as: "user_profile",
    foreignKey: "username",
  });
  user_wall.belongsTo(user_info, {
    as: "username_user_info",
    foreignKey: "username",
  });
  user_info.hasMany(user_wall, { as: "user_walls", foreignKey: "username" });
  follow.belongsTo(user_profile, {
    as: "usr_followed_user_profile",
    foreignKey: "usr_followed",
  });
  user_profile.hasMany(follow, { as: "follows", foreignKey: "usr_followed" });
  follow.belongsTo(user_profile, {
    as: "usr_follow_user_profile",
    foreignKey: "usr_follow",
  });
  user_profile.hasMany(follow, {
    as: "usr_follow_follows",
    foreignKey: "usr_follow",
  });
  general_comment.belongsTo(user_profile, {
    as: "cmt_by_user_profile",
    foreignKey: "cmt_by",
  });
  user_profile.hasMany(general_comment, {
    as: "general_comments",
    foreignKey: "cmt_by",
  });
  general_post.belongsTo(user_profile, {
    as: "author_username_user_profile",
    foreignKey: "author_username",
  });
  user_profile.hasMany(general_post, {
    as: "general_posts",
    foreignKey: "author_username",
  });
  group_member.belongsTo(user_profile, {
    as: "username_user_profile",
    foreignKey: "username",
  });
  user_profile.hasMany(group_member, {
    as: "group_members",
    foreignKey: "username",
  });
  market_comment.belongsTo(user_profile, {
    as: "cmt_by_user_profile",
    foreignKey: "cmt_by",
  });
  user_profile.hasMany(market_comment, {
    as: "market_comments",
    foreignKey: "cmt_by",
  });
  market_post.belongsTo(user_profile, {
    as: "post_by_user_profile",
    foreignKey: "post_by",
  });
  user_profile.hasMany(market_post, {
    as: "market_posts",
    foreignKey: "post_by",
  });
  reaction.belongsTo(user_profile, {
    as: "react_by_user_profile",
    foreignKey: "react_by",
  });
  user_profile.hasMany(reaction, { as: "reactions", foreignKey: "react_by" });
  user_blocked.belongsTo(user_profile, {
    as: "user_blocked_user_profile",
    foreignKey: "user_blocked",
  });
  user_profile.hasMany(user_blocked, {
    as: "user_blockeds",
    foreignKey: "user_blocked",
  });
  group_member.hasMany(group_reported_member, {
    as: "reported_member",
    sourceKey: "username",
    foreignKey: "member",
  });
  group_reported_member.belongsTo(group_member, {
    as: "reported_member_group_reported_member",
    sourceKey: "member",
    foreignKey: "username",
  });

  group_member.hasMany(group_reported_member, {
    as: "reported_member_g",
    sourceKey: "group_id",
    foreignKey: "group_id",
  });
  group_reported_member.belongsTo(group_member, {
    as: "reported_member_group_reported_member_g",
    sourceKey: "group_id",
    foreignKey: "group_id",
  });

  general_post.hasMany(reported_post, {
    as: "reported_general_post",
    sourceKey: "post_id",
    foreignKey: "post_id",
  })
  reported_post.belongsTo(general_post, {
    as: "reported_post_reported_general_post",
    sourceKey: "post_id",
    foreignKey: "post_id",
  })

  return {
    user_info,
    user_profile,
    follow,
    general_post,
    general_comment,
    group_info,
    group_member,
    group_wall,
    market_comment,
    market_post,
    reaction,
    user_blocked,
    user_wall,
    reported_group,
    reported_user,
    reported_post,
    group_reported_member,
    group_reported_post,
  };
}

module.exports = initModels;
