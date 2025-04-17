import jwt from "jsonwebtoken";
import { User } from "../db/models/user.model.js";
export const isAuthenticate = async ( req, res, next)=>{
    try {
        // get data from req
     const {authorization} = req.headers;
     if(!authorization) 
        return res.status(400).json({
            success: false,
            message: "token is required",
        });
     if(!authorization.startsWith("Bearer "))
        return res.status(400).json({
            success: false,
            message: "invalid bearer key",
        });
     const token = authorization.split(" ")[1];
     const {email, id, iat} = jwt.verify(token, process.env.SECRET_JWT); 
        // check user existence 
     const userExist = await User.findById(id);
      if(!userExist)
         return res.status(404).json({
           success: false,
           message: "user not found",
       });
    // pas data of user to req
    if(userExist.isDeleted == true)
        return next(new Error("login first", {cause:400}));
    if(userExist.deletedAt.getTime()> iat*1000)
        return next(new Error("destroyed token",{cause:400}))
    req.authUser = userExist;
    // if exist
    return next();
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }    
};