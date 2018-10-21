const Profile = require("../models/index").Profile;
const ControllerHelpers = require("./controllerHelpers.js");

module.exports = {
    /**
     * Create profile , gets called after account is created
     * @param req 
     * @param res 
     * @param next 
     */
    async create(req,res,next){
        try{
            var userObj = {
                first_name :req.body.first_name,
                last_name :req.body.last_name,
                country: req.body.country,
                gender: req.body.gender,
                cover_image_url:'https://firebasestorage.googleapis.com/v0/b/enamel-hub.appspot.com/o/cover_images%2Fdefault_cover.jpg?alt=media&token=8d06d8ba-6601-4034-9172-4531c4b7a3e6',
                date_of_birth :req.body.date_of_birth,
                // userId:res.userId,
            }
            // console.log(userObj)
            userObj.profile_image_url = ControllerHelpers.setProfileImage(req.body.gender);
            await Profile.create(userObj)
            .catch((error)=>{
                ControllerHelpers.sendError(error,res,"DB error in creating profile")
            })
            .then((profile)=>{
                profile.setUser(res.userId);
                profile.getUser().then(function(result){
                    let user = result.dataValues;
                    delete user.password;
                    res.status(201).send({
                        success:"Account created Succesfully !",
                        user:user,
                        profile:profile,
                        token:ControllerHelpers.jwtSignUser(user)
                    })
                });
            })
        }
        catch(error){
            ControllerHelpers.sendError(error,res,"Server Error in creating profile")

        }
    },
    /**
     * Update user profile image
     * @param req 
     * @param res 
     */
    async update(req,res){
        try{
            let userId = ControllerHelpers.jwtVerifyUser(req.headers.token);
        if(!userId){
            ControllerHelpers.sendError(error,res,"User is not authenticated");
        }
        let fields = JSON.parse(JSON.stringify(req.body));
        Profile.update(fields,{
            where:{
                userId:userId
            }
        })
        .catch((error)=>{
            ControllerHelpers.sendError(error,res,"DB error updating Profile");
        })
        .then(()=>{
            res.status(200).send({
                message : "Updated Succesfully"
            })
        })
        }
        catch(error){
            ControllerHelpers.sendError(error,res,"Server error while updating profile");
        }
    },
    /**
     * Select Profile
     * @param req 
     * @param res 
     */
    async show(req,res){
        try{
            let id = res.userId;
            console.log(id)
            let user = res.user;
            await Profile.findOne({where:{
                userId:id
            }})
            .then((profile)=>{
                let resObj = {
                    user:user,
                    profile:profile
                }
                delete resObj.user.password;
                if(res.token && res.message){
                    resObj.token = res.token;
                    resObj.message = res.message;
                }
                res.send(resObj)
            })
        }
        catch(error){
            ControllerHelpers.sendError(error,res,"Server error getting profile")
        }
    }
}