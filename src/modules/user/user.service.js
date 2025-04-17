import { User } from "../../db/models/user.model.js";
import { message } from "../../utils/messages/index.js";

export const getProfile = async (req, res, next) =>{
    try {
         // get data from req
         const userExist = req.authUser;
            // send response successfully
        return res.status(200).json({
            success: true,
            data:userExist,
        }); 
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const freezeAccount = async(req, res, next) =>{

    // ipdate user doc >> is delete
   await User.updateOne({_id: req.authUser._id}, {isDeleted: true, deletedAt: Date.now()});
   return res.status(200).json({
    success: true,
    message: message.user.deletedSuccessfully,
});
}