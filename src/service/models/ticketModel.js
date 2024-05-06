import mongoose, { Schema, model } from "mongoose";

const ticketSchema = new Schema({ 
    products:{
        type:[{
        product_id:{type:Schema.Types.ObjectId,ref:"productos"},
        quantity:Number
    }]
    },
    purchaseTime: {type:String},
    amount: {type:Number},
    purchaser: {type:String}
});

const ticketModel = model("tickets",ticketSchema)

export default ticketModel;