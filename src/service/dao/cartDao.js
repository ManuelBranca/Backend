import { purchaseAux } from "../../utils/utils.js";
import customError from "../errors/customError.js";
import EErrors from "../errors/error_dictionary.js";
import { generateCartErrorInfo } from "../errors/message/cartErrors.js";
import { cartModel } from "../models/cartmodel.js";
import { productModel } from "../models/productmodel.js";
import ticketModel from "../models/ticketModel.js";
import { productService } from "../service.js";

class cartDao {
    async createCart() {
        const nuevoCart = await cartModel.create({});
        return nuevoCart._id
    }

    async createProduct(product) {
        const productoCreado = await cartModel.create(product)
        return productoCreado
    }

    async getCartById(id) {
        return await cartModel.findById(id);
    }

    async delectProductInCart(cid, pid) {
        const cart = await this.getCartById(cid);
        if (cart) {
            const index = cart.products.findIndex(producto => producto.product_id = pid)
            if (index !== -1) {
                cart.products.splice(index, 1);
                cart.save();
                return true
            } else {
                return false
            }
        }
    }

    async deleteAllProducts(cid) {
        const cart = await this.getCartById(cid)
        cart.products = [];
        cart.save()
    }

    async addProduct(cid, pid) {
        try {
            const product = await productService.getProductsById(pid);
            if(product.stock <= 0){
                return -2
            }
            const carrito = await cartModel.findById(cid);
            if (carrito) {
                const existeProducto = carrito.products.find(producto => producto.product_id._id == pid);
                if (existeProducto) {
                    existeProducto.quantity++;
                    carrito.save();
                    return 2
                }
                carrito.products.push({ product_id: pid, quantity: 1 })
                carrito.save();
                return 1
            }
            console.log("Carritio no encontrado")
            return -1
        } catch (error) {
            console.log(error)
            res.status(500).send("error")
        }
    }

    async purchase(cid,purchaser) {
        try {
            const carrito = await cartModel.findById(cid)
            console.log(cid, "soy cid")
            console.log(carrito, "Soy el carrito")
            if(!carrito){
                console.log("no existe el carrito")
                customError.createError({
                    name: "no existe carrito",
                    cause: generateCartErrorInfo(carrito),
                    message: "no existe un carrito asociado a tu cuenta",
                    code: EErrors.INVALID_TYPES_ERROR
                })
                return "falso";
            }
            //verifico el stock
            if(purchaseAux(carrito) == -1){
                return -1;
            }
            //resto el stock
            for(let i = 0;i < carrito.products.length;i++){
                carrito.products[i].product_id.stock -= carrito.products[i].quantity
            }
            carrito.save();
            let total = 0;
            for (let i = 0;i < carrito.products.length;i++) {
                total += carrito.products[i].product_id.price;
                
            }

            const newTicket = {
                products:carrito.products,
                purchaseTime:new Date(),
                amount:total,
                purchaser: purchaser
            }
            const ticket = ticketModel.create(newTicket);
            this.deleteAllProducts(cid);
            return ticket;
        
        } catch (error) {
            console.log(error)
            return -2;
        }
    }
    
}
export const carritoDao = new cartDao();
