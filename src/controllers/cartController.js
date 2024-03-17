import { carritoDao } from "../service/dao/cartDao.js";

export const firstCart = async (req, res) => {
    try {
        const nuevoCart = await carritoDao.createCart()
        return res.status(200).send(nuevoCart._id)
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error, vuelva a intentarlo")
    }
}

export const addproductToCart = async (req, res) => {
    try {
        const { cid, pid } = req.params
        const result = carritoDao.addProduct(cid, pid)
        switch (result) {
            case 1:
                res.status(200).send("se agrego el producto al carrito")
                break;
            case 2:
                res.status(200).send("se aumento la cantidad del producto en el carrito")
                break;
            default:
                res.status(500).send("No se pudo agregar el producto")
                break;
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("error al agregar el producto", error)
    }
}

export const getCartById = async (req, res) => {
    try {
        const { id } = req.params
        const cart = carritoDao.getCartById(id)
        return res.status(200).send(cart)
    } catch (error) {
        res.status(500).send("Hubo un error")
    }
}

export const delectProductInCart = async (req, res) => {
    try {
        const { cid, pid } = req.params
        const result = carritoDao.delectProductInCart(cid, pid)
        if (result) {
            return res.status(200).send("Se elimino el producto")
        }
        return res.status(500).send("Hubo un error")
    } catch (error) {
        res.status(500).send("Hubo un error")
    }
}

export const vaciarCarrito = async (req, res) => {
    try {
        const { cid } = req.params;
        carritoDao.deleteAllProducts(cid)
        res.status(200).send("Se vacio el carrito")
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error", error)
    }
}