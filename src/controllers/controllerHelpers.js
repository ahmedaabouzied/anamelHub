const jwt = require("jsonwebtoken");
/**
 * signs the user email into a jwt
 * @param user 
 */
module.exports = {
    jwtSignUser : function(user){
        const ONE_DAY = 24*60*60;
        let userId = {id:user.id};
        return jwt.sign(userId,process.env.JWTSECRET, {
            expiresIn : ONE_DAY
        })
    },
    /**
     * Verify a specific token to an id
     * @param token 
     * @param id 
     */
    jwtVerifyUser: function(token){
        id = null;
        jwt.verify(token, process.env.JWTSECRET, function(err, decoded) {
            console.log(decoded.id)
            id = decoded.id;
          });
          return id;
    },
    /**
     * Send error with message
     * @param error
     * @param res
     * @param message
     */
    sendError : function(error,res,message){
        console.log(error);
        res.status(500).send({
            message : message,
            error : error
        })
    },
    setProfileImage(gender){
        if (gender == 'female'){
            return 'https://firebasestorage.googleapis.com/v0/b/enamel-hub.appspot.com/o/profile_images%2Ffemale_doctor.png?alt=media&token=496dd1c4-ef30-486f-8e87-cbb34d47d500'
        }else{
            return 'https://firebasestorage.googleapis.com/v0/b/enamel-hub.appspot.com/o/profile_images%2Fmale_doctor.png?alt=media&token=79c0e6b1-00f5-4730-8c41-1027929ceda7'
        }
    }
}