import { promises as fs } from 'fs'
import { v4 as uuidv4 } from 'uuid'

export class CartManager {
    constructor() {
        this.path = 'cart.json';
        this.carts = []
    }

    getCarts = async () => {
        const response = await fs.readFile(this.path, 'utf8')
        const responseJSON = JSON.parse(response)
        return responseJSON;
    }

    getCartProducts = async (id) => {
        const carts = await this.getCarts()

        const cart = carts.find(cart => cart.id == id);

        if (cart) {
            return cart
        } else {
            console.log('Carrito no encontrado');
        }
    }

    newCart = async () => {
        const id = uuidv4()

        const newCart = { id, products: [] }

        this.carts = await this.getCarts()
        this.carts.push(newCart)

        await fs.writeFile(this.path, JSON.stringify(this.carts))
        return newCart;
    }

    addproductToCart = async (cart_id, product_id) => {
        // pido carrito
        console.log("Entre a la funcion")
        const cart = await this.getCartProducts(cart_id);
        console.log(cart)
        // guardo en una constante el resultado de buscar en el array de products
        // un producto con la id enviada por parametro.
        const productoEncotrado = cart.products.find(producto => producto.product_id == product_id);
        console.log(productoEncotrado, "Producto Encontrado?")
        // Si no se encontro, se agrega un objeto nuevo con una cantidad de 1
        if (!productoEncotrado){
        cart.products.push({product_id, quantity :1});
        } else {
        // sino utilizamos el producto encontrado para sumarle uno al producto existente en el array
        productoEncotrado.quantity++;
        }
        console.log(cart)
        // Escribe el carrito en el archivo
        await fs.writeFile(this.path,JSON.stringify([cart]));
    }
}
