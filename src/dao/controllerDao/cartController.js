import { cartModel } from "../models/cartmodel.js";

export default class cartDao {
    async firstCart(newCart){
        const nuevoCart = await cartModel.create(newCart);
        return nuevoCart._id
    }

    async addproductToCart(id,pid){
        const carrito = await cartModel.findById(id);
        if(carrito){
            const existeProducto = carrito.products.find(producto => producto.product_id==pid);
            if(existeProducto){
                existeProducto.quantity++;
            } else {
                carrito.products.push({product_id:pid,quantity:1})
            }
            carrito.save();
        } else {
            console.log("Carritio no encontrado")
        }
    }

    async getCartById(id){
        return await cartModel.findById(id);
    }

    async delectProductInCart (cid,pid){
        const cart = await this.getCartById(cid);
        if (cart) {
            const index = cart.products.findIndex(producto => producto.product_id = pid)
            if (index !== -1) {
                cart.products.splice(index, 1);
                cart.save();
                return true;
            } else {
                return false;
            }
        }
    }
}