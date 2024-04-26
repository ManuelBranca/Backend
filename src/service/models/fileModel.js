import mongoose, { Schema, model } from "mongoose";


const fileSchema = new Schema({ 
        fieldname: {type:String} ,
        originalname: {type:String},
        encoding: {type:String},
        mimetype: {type:String},
        destination: {type:String},
        filename: {type:String},
        path: {type:String},
        size: {type:Number},
        type: {type:String, enum:["Identificacion","Comprobante de domicilio","Estado de cuenta"]}
});

const fileModel = model("file", fileSchema);
export default fileModel;