const seq = require("../database/db");
const models = seq.models;
//const sequelize = seq.sequelize;
const bcrypt = require("bcrypt");
const saltRounds = 10;

const adminGroupServices = {
    checkExistGeneralPost: async (post_id) => {
        const result = await models.general_post.findAll({
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
    //Ban thanh vien (cua QTV group)
    banMemberOfGroup: async (group_id, username) => {
        try {
            const banMember = await models.group_member.update(
                {
                    permission: -1,
                },
                {
                    where: {
                        group_id: group_id,
                        username: username,
                    },
                }
            );
            console.log(`banned member ${username} in group ${group_id} \n`);
            return true;
        } catch (err) {
            console.log(`raise error when ban member ${username} in group ${group_id} \n `);
            console.log(err);
            return false;
        }
    },
    //Xoa thanh vien (cua QTV group) (kick)
    deleteMemberOfGroup: async (group_id, username) => {
        try {
            const delMember = await models.group_member.destroy({
                where: {
                    group_id: group_id,
                    username: username,
                },
            });
            //Xoa tat ca bao cao ve thanh vien nay trong nhom
            const delMemmberReport = await models.group_reported_member.destroy({
                where: {
                    group_id: group_id,
                    member: username,
                },
            });
            console.log(`deleted member ${username} in group ${group_id} \n`);
            return true;
        } catch (err) {
            console.log(`raise error when delete member ${username} in group ${group_id} \n `);
            console.log(err);
            return false;
        }
    },
    //Xoa post trong group (cua QTV group) 
    deletePostOfGroup: async (group_id, post_id) => {
        try {
            const delPostOfGroup = await models.group_wall.destroy({
                where: {
                    group_id: group_id,
                    post_id: post_id,
                },
            });
            //Xoa tat ca bao cao ve post nay trong nhom
            const delPostReport = await models.group_reported_post.destroy({
                where: {
                    group_id: group_id,
                    post_id: post_id,
                },
            });
            if (await adminGroupServices.checkExistGeneralPost(post_id)) {
                const delGeneralPost = await models.general_post.destroy({
                    where: {
                        post_id: post_id,
                    },
                });
                //Xoa tat ca bao cao ve post nay
                const delPostReport = await models.reported_post.destroy({
                    where: {
                        post_id: post_id,
                    },
                });
            }
            console.log(`delete post ${post_id} in group ${group_id} \n`);
            return true;
        } catch (err) {
            console.log(`raise error when delete post  ${post_id} in group  ${group_id} \n `);
            console.log(err);
            return false;
        }
    },
    //Xoa bao cao thanh vien trong group
    deleteMemberReportOfGroup: async (group_id, report_id) => {
        try {
            const delMemmberReport = await models.group_reported_member.destroy({
                where: {
                    group_id: group_id,
                    report_id: report_id,
                },
            });
            console.log(`deleted member report ${report_id} in group ${group_id} \n`);
            return true;
        } catch (err) {
            console.log(`raise error when delete member report ${report_id} in group ${group_id} \n `);
            console.log(err);
            return false;
        }
    },
    //Xoa bao cao post trong group
    deletePostReportOfGroup: async (group_id, report_id) => {
        try {
            const delPostReport = await models.group_reported_post.destroy({
                where: {
                    group_id: group_id,
                    report_id: report_id,
                },
            });
            console.log(`deleted post report ${report_id} in group ${group_id} \n`);
            return true;
        } catch (err) {
            console.log(`raise error when delete post report ${report_id} in group ${group_id} \n `);
            console.log(err);
            return false;
        }
    },
};


module.exports = adminGroupServices;