const seq = require("../database/db");
const models = seq.models;

const adminServices = {
    getAllReportUsers: async () => {
        const result = await models.reported_user.findAll();
        return result
    },
    getAllReportPosts: async () => {
        const result = await models.reported_post.findAll();
        return result
    },
    getPost: async (post_id) => {
        const result = await models.general_post.findAll({
            include: [
                {
                    model: models.user_profile,
                    as: "author_username_user_profile",
                    attributes: ["username", "avatar", "fullname"],
                },
            ],
            where: {
                post_id: post_id,
            },
        });
        return result[0]
    },
    checkExistGroupPost: async (post_id) => {
        const result = await models.group_wall.findAll({
            where: {
                post_id: post_id,
            },
        });
        if (result === null) {
            return false;
        } else {
            return true;
        }
    },
    //Xoa nguoi dung (cua admin)
    deleteUser: async (username) => {
        try {
            //Xoa tat ca bao cao ve nguoi dung nay
            const delUserReport = await models.reported_user.destroy({
                where: {
                    reported_user: username,
                },
            });
            const delUserFollowed = await models.follow.destroy({
                where: {
                    usr_followed: username,
                },
            });
            const delFollow = await models.follow.destroy({
                where: {
                    usr_follow: username,
                },
            });
            const delReaction = await models.reaction.destroy({
                where: {
                    react_by: username,
                },
            });
            const delGeneralComments = await models.general_comment.destroy({
                where: {
                    cmt_by: username,
                },
            });
            const delMarketComments = await models.market_comment.destroy({
                where: {
                    cmt_by: username,
                },
            });
            const delMarketPost = await models.market_post.destroy({
                where: {
                    post_by: username,
                },
            });
            const reportedPost = await models.reported_post.findAll({
                include: [
                    {
                      model: models.general_post,
                      required: true,
                      as: "reported_post_reported_general_post",
                      where: {
                        author_username: username,
                      },
                      attributes: ['post_id'],
                    },
                ],
            });

            for (let i = 0; i < reportedPost.length; i++) {
                let delReportedPost = await models.reported_post.destroy({
                    where: {
                        post_id: reportedPost[i].dataValues.reported_post_reported_general_post.dataValues.post_id
                    }
                })
            }
            
            const delGeneralPost = await models.general_post.destroy({
                where: {
                    author_username: username,
                },
            });
            const delGroupMember = await models.group_member.destroy({
                where: {
                    username: username,
                },
            });
            
            const delProfile = await models.user_profile.destroy({
                where: {
                    username: username,
                },
            });
            const changeUser = await models.user_info.update(
                {
                    permission: -1,
                },
                {
                    where: {
                        username: username,
                    },
                }
            );
            console.log(`deleted user with username: ${username} \n`);
            return true;
        } catch (err) {
            console.log(`raise error when delete user with username: ${username} \n `);
            console.log(err);
            return false;
        }
    },
    //Xoa general post (cua admin)
    deleteGeneralPost: async (post_id) => {
        try {
            //Xoa tat ca bao cao ve post nay
            const delPostReport = await models.reported_post.destroy({
                where: {
                    post_id: post_id,
                },
            });
            //console.log(delPostReport)
            if (await adminServices.checkExistGroupPost(post_id)) {
                //Xoa tat ca bao cao ve post nay trong nhom
                const delPostReportOfGroup = await models.group_reported_post.destroy({
                    where: {
                        post_id: post_id,
                    },
                });
                //console.log(delPostReportOfGroup)
                const delPostOfGroup = await models.group_wall.destroy({
                    where: {
                        post_id: post_id,
                    },
                });
                
                //console.log(delPostOfGroup)
            }
            const delGeneralPost = await models.general_post.destroy({
                where: {
                    post_id: post_id,
                },
            });
            
            
            //console.log(delGeneralPost)
            console.log(`deleted general post: ${post_id} \n`);
            return true;
        } catch (err) {
            console.log(`raise error when delete general post: ${post_id} \n `);
            console.log(err);
            return false;
        }
    },
    //Xoa post o trong market (cua admin)
    deleteMarketPost: async (post_id) => {
        try {
            //Xoa tat ca bao cao ve post nay
            const delPostReport = await models.reported_post.destroy({
                where: {
                    post_id: post_id,
                },
            });
            const delMarketPost = await models.market_post.destroy({
                where: {
                    post_id: post_id,
                },
            });
            console.log(`deleted market post: ${post_id} \n`);
            return true;
        } catch (err) {
            console.log(`raise error when delete market post: ${post_id} \n `);
            console.log(err);
            return false;
        }
    },
    //Xoa group (cua admin)
    deleteGroup: async (group_id) => {
        try {
            //Xoa tat ca bao cao ve group nay
            const delGroupReport = await models.reported_group.destroy({
                where: {
                    group_id: group_id,
                },
            });
            const delGroup = await models.group_info.destroy({
                where: {
                    group_id: group_id,
                },
            });
            console.log(`deleted group: ${group_id} \n`);
            return true;
        } catch (err) {
            console.log(`raise error when delete group: ${group_id} \n `);
            console.log(err);
            return false;
        }
    },
    //Xoa bao cao nguoi dung cua admin
    skipUser: async (report_id) => {
        try {
            const result = models.reported_user.destroy({
                where: {
                    report_id: report_id,
                },
            })
            console.log(`skip user report: ${report_id} \n`);
            return true
        } catch(err) {
            console.log(`raise error when skipping reported user with report_id: ${report_id} \n `);
            console.log(err);
            return false;
        }
    },
    //Xoa bao cao post cua admin
    skipPost: async (report_id) => {
        try {
            const result = models.reported_post.destroy({
                where: {
                    report_id: report_id,
                },
            })
            console.log(`skip post report: ${report_id} \n`);
            return true
        } catch(err) {
            console.log(`raise error when skipping reported post with report_id: ${report_id} \n `);
            console.log(err);
            return false;
        }
    },
    //Xoa bao cao group cua admin
    skipGroup: async (report_id) => {
        try {
            const delGroupReport = await models.reported_group.destroy({
                where: {
                    report_id: report_id,
                },
            });
            console.log(`deleted group report: ${report_id} \n`);
            return true;
        } catch (err) {
            console.log(`raise error when delete group report: ${report_id} \n `);
            console.log(err);
            return false;
        }
    },
};


module.exports = adminServices;