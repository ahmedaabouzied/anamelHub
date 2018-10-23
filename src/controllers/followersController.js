const Case = require('../models/index').Case;
const User = require('../models/index').User;
const Star = require('../models/index').Star;
const Profile = require('../models/index').Profile;
const Tag = require('../models/index').Tag;
const Follower = require('../models/index').Follower;
const ControllerHelpers = require('./controllerHelpers');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
module.exports = {
    async follow(req, res) {
        try {
            let userId = ControllerHelpers.jwtVerifyUser(req.headers.token);
            if (!userId) {
                ControllerHelpers.sendError(error, res, "User is not authenticated");
            }
            Follower.create({
                userId: req.params.followingId,
                followerId: userId
            })
                .then((result) => {
                    res.send({
                        message: "Followed Succesfully"
                    })
                })
                .catch((error) => {
                    ControllerHelpers.sendError(error, res, "DB Error following user");
                })
        }
        catch (error) {
            ControllerHelpers.sendError(error, res, "Error following user")
        }
    },
    async unfollow(req, res) {
        try {
            let userId = ControllerHelpers.jwtVerifyUser(req.headers.token);
            if (!userId) {
                ControllerHelpers.sendError(error, res, "User is not authenticated");
            }
            Follower.destroy({
                where: {
                    userId: req.params.followingId,
                    followerId: userId
                }
            })
                .catch((error) => {
                    ControllerHelpers.sendError(error, res, "DB Error Unfollwing User");
                })
                .then((result) => {
                    res.send({
                        message: "Unfollowed Succesfully"
                    })
                })
        }
        catch (error) {
            ControllerHelpers.sendError(error, res, "Error Unfollowing User");
        }
    },
    async isFollowing(req, res) {
        try {
            let userId = ControllerHelpers.jwtVerifyUser(req.headers.token);
            if (!userId) {
                ControllerHelpers.sendError(error, res, "User is not authenticated");
            }
            Follower.find({
                where: {
                    userId: req.params.id,
                    followerId: userId
                }
            })
                .then((result) => {
                    if (result) {
                        res.send({
                            state: true
                        })
                    } else {
                        res.send({
                            state: false
                        })
                    }
                })
                .catch((error) => {
                    ControllerHelpers.sendError(error, res, "DB Error getting following state");
                })
        }
        catch (error) {
            ControllerHelpers.sendError(error, res, "Error Getting Follwing Condition");
        }
    },
    async getCasesOfFollowedUsers(req, res) {
        try {
            let userId = ControllerHelpers.jwtVerifyUser(req.headers.token);
            let offsetTimes = parseInt(req.params.offset);
            if (!userId) {
                ControllerHelpers.sendError(error, res, "User is not authenticated");
            }
            Follower.findAll({
                where: {
                    followerId: userId
                },
                attributes: ['userId'],
                limit: 10,

            })
                .then((result) => {
                    let followedAccountIdsArr = result;
                    followedAccountIdsArr = followedAccountIdsArr.map(x => x.userId);
                    Case.findAll({
                        where: {
                            userId: {
                                [Op.in]: followedAccountIdsArr
                            }
                        },
                        include: [
                            {
                                model: Star,
                                as: 'stars'
                            },
                            {
                                model: Tag,
                                as: "Tags"
                            },
                            {
                                model: User,
                                as: "user",
                                include: {
                                    model: Profile,
                                    as: "Profile"
                                }
                            },
                        ],
                        limit: 10,
                        offset: offsetTimes
                    })
                        .then((result) => {
                            res.send(result);
                        })
                })
        }
        catch (error) {
            ControllerHelpers.sendError(error, res, "Error getting Cases of followed Users");
        }
    }
}