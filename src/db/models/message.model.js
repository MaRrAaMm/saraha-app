import { model, Schema, Types } from "mongoose";
//schema
const messageSchema = new Schema(
    {
        content:{ type: String, required: true},
        sender:{type: Types.ObjectId, ref: "User"},
        receiver:{type: Types.ObjectId, required: true, ref: "User"}
    },
    {
        timestamps:true
    }
);

//model
export const Message = model("message", messageSchema);