const Case = require('../models/index').Case;
const User = require('../models/index').User;
const Star = require('../models/index').Star;
const Profile = require('../models/index').Profile;
const ControllerHelpers = require('./controllerHelpers');
module.exports = {
    /**
     * Create new case 
     * @param req 
     * @param res 
     */
    async create(req,res){
        try{
            let userId = ControllerHelpers.jwtVerifyUser(req.headers.token);
            if(!userId){
                ControllerHelpers.sendError("Not Authorized",res,"User is not logged in !");
            }else{
                let caseObj = {
                    title : req.body.title,
                    gender : req.body.gender,
                    age : req.body.age,
                    symptoms : req.body.symptoms,
                    diagnosis : req.body.diagnosis,
                    details : req.body.details,
                    treatment :req.body.treatment,
                    image_url : req.body.image_url,
                    userId : userId
                }
                Case.create(caseObj)
                .catch((error)=>{
                    ControllerHelpers.sendError(error,res," DB Error creating case")
                })
                .then((result)=>{
                    res.send({
                        message : "Case Created Succesfully !",
                        case : result
                    })
                })
                
            }
        }
        catch(error){
            ControllerHelpers.sendError(error,res,"Error Creating Case");
        }
    },
    /**
     * Show case by it's id 
     * @param req 
     * @param res 
     */
    async show(req,res){
        try{
            let caseId = req.params.id;
            Case.findById(caseId)
            .then((result)=>{
                if(result === null){
                    res.status(404).send({
                        message : "Not Found"
                    })
                }
                User.findById(result.userId)
                .then((user)=>{
                    Profile.find({
                        where:{
                            userId : user.id
                        }
                    })
                    .then((profile)=>{
                        Star.find({
                            where:{
                                caseId : result.id
                            }
                        })
                        .then((stars)=>{
                            res.send({
                                case:result,
                                stars:stars,
                                user:user,
                                profile:profile
                            })
                        })
                        
                    })
                })
                .catch((error)=>{
                    ControllerHelpers.sendError(error,res,"DB error fetching the owner of the case");
                })
            })
            .catch((error)=>{
                ControllerHelpers.sendError(error,res,"DB error fetching the case");
            })
        }
        catch(error){
            ControllerHelpers.sendError(error,res,"Error getting the case");
        }
    },
    /**
     * Update case details
     * @param req 
     * @param res 
     */
    async update(req,res){
        try{
            let userId = ControllerHelpers.jwtVerifyUser(req.headers.token);
            if(!userId){
                ControllerHelpers.sendError("error updating case because user is not logged in ",res,"User is not logged in ");
            }else{
                Case.findById(req.params.id)
                .then((result)=>{
                    console.log(result.userId);
                    console.log(userId);
                    console.log(result.userId == userId);
                    if(result.userId == userId){
                        Case.update(req.body,{
                            where:{
                                id : req.params.id
                            }
                        })
                        .catch((error)=>{
                            ControllerHelpers.sendError(error,res,"DB error updating case");
                        })
                        .then((result)=>{
                            res.send({
                                message : "Case updated succesfully",
                            })
                        })
                    }else{
                        ControllerHelpers.sendError("Unauthorized",res,"User doesn't own this case");
                    }
                })
            }
        }
        catch(error){
            ControllerHelpers.sendError(error,res,"Error updating case");
        }
    },
    /**
     * Delete case by it's id 
     * @param req 
     * @param res 
     */
    async remove(req,res){
        try{
            let userId = ControllerHelpers.jwtVerifyUser(req.headers.token);
            if(!userId){
                ControllerHelpers.sendError("error updating case because user is not logged in ",res,"User is not logged in ");
            }else{
                Case.findById(req.params.id)
                .then((result)=>{
                    if(result.userId == userId){
                        Case.destroy({
                            where:{
                                id:req.params.id
                            }
                        })
                        .catch((error)=>{
                            ControllerHelpers.sendError(error,res,"DB error deleting case");
                        })
                        .then((result)=>{
                            res.send({
                                message : "Case deleted succesfully",
                            })
                        })
                    }else{
                        ControllerHelpers.sendError("Unauthorized",res,"User doesn't own this case");
                    }
                })
            }
        }   
        catch(error){
            ControllerHelpers.sendError(error,res,"Error deleting case")
        }
    },
    async showCasesByUser(req,res){
        try{
            console.log(req.headers.token)
            let userId = ControllerHelpers.jwtVerifyUser(req.headers.token);
            if(!userId){
                ControllerHelpers.sendError("error updating case because user is not logged in ",res,"User is not logged in ");
            }else{
                Case.findAll({
                    where:{
                        userId:req.params.id
                    },
                    include: [{// Notice `include` takes an ARRAY
                        model: Star,
                        as: 'stars'
                    }]
                })
                .catch((error)=>{
                    ControllerHelpers.sendError(error,res,"DB error getting cases");
                })
                .then((result)=>{
                    res.send({
                        cases:result
                    })
                })
            }
        }
        catch(error){
            ControllerHelpers.sendError(error,res,"Error getting user cases")
        }
    }
}