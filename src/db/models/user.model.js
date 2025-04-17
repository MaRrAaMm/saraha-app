import { model, Schema } from "mongoose";
export const genders ={
    MALE: "male",
    M:"m",
    F:"f",
    FEMALE: "female",
};
export const roles = {
    USER:"user",
    ADMIN:"admin"
};
Object.values(genders);
Object.keys(genders);
const userSchema = new Schema(
    {
        email: {type: String, required: true,unique: [true, "email already exist"], toLowerCase: true},
        password:{ type: String, required: true},
        userName:{
            type: String,
            required: true,
            minLength:2,
            minLength:20,
            unique: [true, "userName already exist"]},
        phone:{ type: String, required: true, unique: [true, "phone already exist"]},
        gender: {type:String, enum: Object.values(genders)},
        isConfirmed: { type: Boolean, default: false},
        isDeleted: {type:Boolean, default: false},
        deletedAt:{type: Date},
        role :{type: String, enum:Object.values(roles), default: roles.USER},
    },
    {
        timestamps: true,
    }
);
export const User = model("user",userSchema);