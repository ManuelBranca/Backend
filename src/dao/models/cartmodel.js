import mongoose, { Schema, model } from "mongoose";

const cartSchema = new Schema({
    products:{
        type:[{
        product_id:{type:Schema.Types.ObjectId,ref:"productos"},
        quantity:Number
    }]
    }
})

cartSchema.pre("findOne", function(){
    this.populate("products.product_id");
});

const cartModel = model("carrito", cartSchema)
export {cartModel};