import { cartService } from "../service/service.js";
import nodemailer from "nodemailer"
import variables from "../config/config.js";

const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: variables.EmailAccount,
        pass: variables.AppPassword
    }

})

export const sendEmailTicket = async (email, ticket) => {
    try {
        const options = {
            from: variables.EmailAccount,
            to: email,
            subject: "Purchase ticket",
            html: `<div>
            <h1>Gracias por comprar!</h1>
            <p>Ecommerce de Manuel</p>
            <p>Productos Comprados:${ticket.products}</p>
            <p>Precio Total:${ticket.amount}</p>
            </div>`
        }
        await transporter.sendMail(options)
        return "email enviado"
    } catch (error) {
        console.log(error)
    }
}

export const firstCart = async (req, res) => {
    try {
        const nuevoCart = await cartService.createCart()
        return res.status(200).send(nuevoCart._id)
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error, vuelva a intentarlo")
    }
}

export const addproductToCart = async (req, res) => {
    try {
        console.log("entre al controller")
        const { cartID } = req.user
        const { pid } = req.params
        console.log(pid)
        const result = await cartService.addProduct(cartID, pid)
        console.log(result)
        switch (result) {
            case 1:
                res.status(200).send("se agrego el producto al carrito")
                break;
            case 2:
                res.status(200).send("se aumento la cantidad del producto en el carrito")
                break;
            case -2:
                res.status(400).send("No hay stock disponible")
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
        const id = req.user.cartID
        console.log(id)
        const cart = cartService.getCartById(id)
        return res.status(200).send(cart)
    } catch (error) {
        res.status(500).send("Hubo un error")
    }
}

export const delectProductInCart = async (req, res) => {
    try {
        const {cartID} = req.user
        const { pid } = req.params
        const result = cartService.delectProductInCart(cartID, pid)
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
        const cid = req.user.cartID;
        cartService.deleteAllProducts(cid)
        res.status(200).send("Se vacio el carrito")
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error", error)
    }
}

export const purchase = async (req, res) => {
    try {
        const cid = req.user.cartID;
        const ticket = await cartService.purchase(cid, req.user.email)
        if (ticket == -1) {
            return res.status(201).send("No se pueden agregar productos sin stock")
        }
        await sendEmailTicket(req.user.email, ticket)
        res.status(200).send("Compra finalizada")
    } catch (error) {
        console.log(error)
        res.status(500).send("No se pudo realizar la compra", error)
    }
}