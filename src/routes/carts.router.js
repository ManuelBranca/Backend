import { Router } from "express";
import { cartManager } from "../index.js";
import cartDao from "../dao/controllerDao/cartController.js";

const cartsRouter = Router();
const carritoDos = new cartDao();

cartsRouter.post('/', async (req, res) => {
    try {
        const response = await carritoDos.firstCart({})
        res.status(200).send(response)
    } catch (error) {
        res.send('Error al crear carrito', error)
    }
})

cartsRouter.get('/:cid', async (req, res) => {
    const { cid } = req.params;
    try {
        const response = await carritoDos.getCartById(cid)
        res.json(response)
    } catch (error) {
        console.log(error);
        res.send('Error al intentar enviar los productos del carrito')

    }
})

cartsRouter.post('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    try {
        await carritoDos.addproductToCart(cid, pid)
        res.send('Producto agregado exitosamente')
    } catch (error) {
        res.send('Error al intentar guardar prodcuto en el carrito')
    }
})

cartsRouter.delete('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    try {
        const seElimino = carritoDos.delectProductInCart(cid, pid);
        if (seElimino) {
            res.send("Se pudo eliminar")
        } else {
            res.send("No existia el producto en el carrito")
        }
    } catch (error) {
        console.log(error);
    }
})

cartsRouter.delete('/:cid', async (req, res) => {
    const { cid } = req.params;
    try {
        const cart = await carritoDos.getCartById(cid);
        cart.products = [];
        cart.save();
        res.send("Se vacio el carrito")
    } catch(error){
        console.log(error);
    }
})
export default cartsRouter;