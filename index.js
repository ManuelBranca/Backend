import express from "express";
import { ProductManager } from "./productManager";
import { CartManager } from "./cartManager";
import { productsRouter } from "./routes/products.router";
import { cartsRouter } from "./routes/carts.router.js";

const PORT = 8000;

const app = express();

export const productManager = new ProductManager;
export const cartManager = new CartManager;

app.use(express.json())
app.use('/api/productos', productsRouter)
app.use('/api/carts', cartsRouter)


app.listen(PORT,(req,res)=> {
	console.log(`Servidor escuchando en el puerto ${PORT}`)
})