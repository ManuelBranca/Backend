import { Router } from "express";
import {
    firstCart, addproductToCart, getCartById,
    delectProductInCart,vaciarCarrito
} from "../controllers/cartController.js";

const cartsRouter = Router();

cartsRouter.post('/', firstCart)

cartsRouter.get('/:cid', getCartById)

cartsRouter.post('/:cid/products/:pid', addproductToCart)

cartsRouter.delete('/:cid/products/:pid', delectProductInCart)

cartsRouter.delete('/:cid', vaciarCarrito)

export default cartsRouter;