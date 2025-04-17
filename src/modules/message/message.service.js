import { Message } from "../../db/models/message.model.js";
import { User } from "../../db/models/user.model.js";
import { message } from "../../utils/messages/index.js";

export const sendMessage = async(req, res, next)=>{
    //check receiver id
    const {content, receiver} = req.body;
    const receiverExist = User.findById(receiver);
    if(!receiverExist) return next(new Error(Message.user.notfound,{cause:404}));

    // create message
    const createdMessage = await Message.create({content, receiver});
    return res.status(201).json({
        success:true, 
        message:message.message.createdSuccessfully, 
        data: createdMessage
    });
};

export const getMessage = async(req, res, next)=>{ 
    // req.query >> optionals >> flag>> 1 receiver >>0>> sender
    const messages =
       req.query.flag ==1
         ? await Message.find({sender: req.authUser._id})
         : await Message.find({receiver: req.authUser._id});
    return res.status(201).json({
        success:true,
        data: messages
    });

};

export const deleteMessagge =async(req, res, next)=>{
    //check message existence
    const message = await Message.findById(req.params.id)
    if(!message)
         return next(new Error(message.message.notfound,{cause: 404}));
    //check message receiver
    
    if(req.authUser._id.toString() != message.receiver.toString())
        return next(new Error("not allowed🙈",{cause:401}));
    await Message.deleteOne({_id: req.params.id});
    return res.status(200).json({
        success:true,
        // message: message.message.deletedSuccessfully
         message: "Message deleted successfully"
    });
};