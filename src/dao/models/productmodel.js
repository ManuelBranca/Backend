import mongoose, { Schema, model } from "mongoose";
import mongoosepaginate from "mongoose-paginate-v2";

const productSchema = new Schema({ 
    title:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    thumbnail:String,
    code:{type:String,required:true,unique:true},
    stock:{type:Number,required:true},
    status:Boolean
});

productSchema.plugin(mongoosepaginate)

const productModel = model("productos",productSchema);
export{productModel};