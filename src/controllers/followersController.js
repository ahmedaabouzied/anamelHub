const Case = require('../models/index').Case;
const User = require('../models/index').User;
const Star = require('../models/index').Star;
const Profile = require('../models/index').Profile;
const Tag = require('../models/index').Tag;
const Follower = require('../models/index').Follower;
const ControllerHelpers = require('./controllerHelpers');

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
    async isFollowing(req,res){
        try{
            let userId = ControllerHelpers.jwtVerifyUser(req.headers.token);
            if (!userId) {
                ControllerHelpers.sendError(error, res, "User is not authenticated");
            }
            console.log(req.params.id);
            Follower.find({
                where:{
                    userId:req.params.id,
                    followerId:userId
                }
            })
            .then((result)=>{
                console.log(result)
                if(result){
                    res.send({
                        state:true
                    })
                }else{
                    res.send({
                        state:false
                    })
                }
            })
            .catch((error)=>{
                ControllerHelpers.sendError(error,res,"DB Error getting following state");
            })
        }
        catch(error){
            ControllerHelpers.sendError(error,res,"Error Getting Follwing Condition");
        }
    }
}