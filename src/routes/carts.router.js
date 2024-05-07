import { Router } from "express";
import {
    firstCart, addproductToCart, getCartById,
    delectProductInCart, vaciarCarrito, purchase
} from "../controllers/cartController.js";
import { authorization } from "../utils/utils.js";
import { useStrategy } from "../utils/utils.js";


const cartsRouter = Router();

cartsRouter.post('/', useStrategy("jwt"), firstCart)

cartsRouter.get('/getOne', useStrategy("jwt"), authorization(["user","admin", "premium"]), getCartById)

cartsRouter.post('/products/:pid', useStrategy("jwt"), addproductToCart)

cartsRouter.delete('/products/:pid', useStrategy("jwt"), delectProductInCart)

cartsRouter.delete('/allProducts', useStrategy("jwt"), vaciarCarrito)

cartsRouter.post('/purchase', useStrategy("jwt"), authorization(["user", "premium" ,"admin"]), purchase)

export default cartsRouter;