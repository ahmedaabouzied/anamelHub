const ControllerHelpers = require('./controllerHelpers');
const Star = require('../models/index').Star;

module.exports = {
    /**
     * Create a star for a case 
     * @param req 
     * @param res 
     */
    async create(req,res){
        try{
            let caseId = req.params.caseId;
            let userId = ControllerHelpers.jwtVerifyUser(req.headers.token);
            if(!userId){
                ControllerHelpers.sendForbidden("UnAuthorized motherfucker attempt",res,"User is not logged in")
            }
            Star.create({
                userId:userId,
                caseId:caseId
            })
            .catch((error)=>{
                ControllerHelpers.sendError(error,res,"DB error creating the star");
            })
            .then(()=>{
                // Star.setUser(userId);
                // Star.setCase(caseId);
                res.send({
                    message: "star created succesfully"
                })
            })
        }
        catch(error){
            ControllerHelpers.sendError(error,res,"Error creating the star");
        }
    },
    async remove(req,res){
        try{
            let caseId = req.params.caseId;
            let userId = ControllerHelpers.jwtVerifyUser(req.headers.token);
            if(!userId){
                ControllerHelpers.sendForbidden("Anauthorized mutherfucker user attempt",res,"User is not logged in");
            }else{
                Star.destroy({
                    where:{
                        caseId:caseId,
                        userId:userId
                    }
                })
                .catch((error)=>{
                    ControllerHelpers.sendError(error,res,"DB error removing the star");
                })
                .then(()=>{
                    res.status(200).send({
                        message: "Star removed Succesfully"
                    })
                })
            }
        }   
        catch(error){
            ControllerHelpers.sendError(error,res,"Error removing the star");
        }
    }
}