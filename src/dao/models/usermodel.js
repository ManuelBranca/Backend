import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({ 
    name:{type:String,required:true},
    lastname:{type:String,required:true},
    username:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
});

const usersModel = model("users", userSchema)
export {usersModel};