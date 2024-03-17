import { cartModel } from "../models/cartmodel.js";

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
        const carrito = await cartModel.findById(cid);
        if (carrito) {
            const existeProducto = carrito.products.find(producto => producto.product_id == pid);
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
    }
}
export const carritoDao = new cartDao();
