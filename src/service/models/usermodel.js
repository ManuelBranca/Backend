import mongoose, { Schema, SchemaTypes, model } from "mongoose";

const userSchema = new Schema({ 
    name:{type:String,required:true},
    lastname:{type:String,required:false},
    username:{type:String,required:true,unique:true},
    email:{type:String,required:false,unique:false},
    password:{type:String,required:true},
    age:{type:Number,require:true},
    cartID:{type:Schema.Types.ObjectId,ref:"carrito"},
    role:{type:String,enum: ["user","admin","premium"], default: "user"},
    loggedBy:{type:String}
});

const usersModel = model("users", userSchema)
export {usersModel};