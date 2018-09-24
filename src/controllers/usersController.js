const jwt = require("jsonwebtoken");

const User = require("../models/index").User;
const ControllerHelpers = require("./controllerHelpers.js");

module.exports = {
    /**
     * Create new user
     * @param req 
     * @param res 
     */
    async create(req,res,next){
        try{
            const user = await User.create({
                email:req.body.email,
                password:req.body.password,
            },).then((user)=>{
                res.userId = user.id;
                next();
            })
            .catch((error)=>{
                if(error.name == "SequelizeUniqueConstraintError"){
                    res.status(400).send({
                        error:"Username already exists"
                    })
                }else{
                    ControllerHelpers.sendError(error,res,"DB error in creating User")

                }
            })
        }
        catch(error){
            console.log("Error in creating the user");
            console.log(error)
            if(error.SequelizeUniqueConstraintError == "Validation error"){
                res.send("Username exists already")
            }
            res.status(402).send({
                error:"Error Creating the user"
            });
        }
    },
    /**
     * Slect User by id
     * @param req 
     * @param res 
     */
    async selectUserById(req,res,next){
        try{
            let id = req.params.id;
            User.findById(id)
            .catch((error)=>{
                ControllerHelpers.sendError(error,res,"Error finding user")

            })
            .then((user)=>{
                if(!user){
                    res.status(402).send({
                        message:"User Not Found"
                    })
                }else{
                    delete user.password;
                    res.user = user;
                    res.userId = id;
                    next();
                }
            })
        }
        catch(error){
            ControllerHelpers.sendError(error,res,"server error in finding user")

        }
    },
    /**
     * Login user by email , password
     * @param req 
     * @param res 
     */
    async login(req,res,next){
        try{
            const {email,password} = req.body;
            await User.findOne({
                where:{
                    email:email
                }
            })
            .catch((error)=>{
                ControllerHelpers.sendError(error,res,"DB error in finding user")

            })
            .then((user)=>{
                if(!user){
                    res.status(402).send({
                        error:"Email is not registered"
                    });
                }else{
                    user.comparePassword(password).then((result)=>{
                        if (result){
                            delete user.password;
                            res.message = "Login Succesfully";
                            res.user = user;
                            res.userId = user.id;
                            res.token = ControllerHelpers.jwtSignUser(user.toJSON());
                            next();
                        }else{
                            res.status(403).send({
                                message : "wrong Password"
                            })
                        }
                    })
                }
            })
        }
        catch(error){
            ControllerHelpers.sendError(error,res,"Server error in login")

        }
    },
    /**
     * Update user credentials {username,pass}
     * @param req 
     * @param res 
     */
    async update(req,res){
        try{
            //console.log(req.headers)
            let userId = ControllerHelpers.jwtVerifyUser(req.headers.token);
            console.log(userId)
            let fields = JSON.parse(JSON.stringify(req.body));
            console.log(fields);
            User.update(
                fields,{where:{
                    id:userId
                }}
            )
            .catch((error)=>{
                ControllerHelpers.sendError(error,res,"DB error in updating user")

            })
            .then((rowsUpdated)=>{
                res.send({
                    message : "Updated Succesfully",
                    rows:rowsUpdated
                })
            })
        }
        catch(error){
            ControllerHelpers.sendError(error,res,"server error in updating user")

        }
    },
    /**
     * Delete user permanently
     * @param req 
     * @param res 
     */
    async remove(req,res){
        try{
            let userId = ControllerHelpers.jwtVerifyUser(req.headers.token);
            let userToDelete = req.params.id;
            if(userId == userToDelete){
                User.destroy({
                    where:{
                        id : userToDelete
                    }
                })
                .catch((error)=>{
                    ControllerHelpers.sendError(error,res,"DB error in deleting user")

                })
                .then(()=>{
                    res.status(200).send({
                        success : "User Deleted Succesfully"
                    })
                })
            }else{
                res.status(401).send({
                    error: "Unauthorized request to delete this user"
                })
            }
            

        }
        catch(error){
            ControllerHelpers.sendError(error,res,"server error in deleting user")
        }
    }
}