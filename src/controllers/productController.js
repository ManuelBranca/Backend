import {productService} from "../service/service.js";
import { createMockProducts } from "../utils/utils.js";

export const getProducts = async (req, res) => {
    try {
        const { limit, page, query, sort } = req.query;
        const products = await productService.getAllProducts(limit, page, query, sort)
        res.status(200).send(products)
        req.logger.info(products.docs)
    } catch (error) {
        console.log(error);
        res.status(500).send('ERROR AL INTENTAR RECIBIR LOS PRODUCTOS')
    }
}

export const getProductsById = async (req, res) => {
    try {
        const { pid } = req.params;
        const products = await productService.getProductsById(pid)
        res.status(200).send(products)
    } catch (error) {
        console.log(error)
        res.status(500).send(`ERROR AL INTENTAR RECIBIR EL PRODUCTO CON ID ${pid}`)
    }
}


export const createProduct = async (req, res) => {
    try {
        const {email} = req.user
        const response = await productService.addProduct(req.body, email)
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res.status(500).send(`ERROR AL INTENTAR AGREGAR PRODCUTO`)
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { pid } = req.params
        const productoActualizado = await productService.updateProduct(pid, req.body);
        res.status(200).send(productoActualizado);
    } catch (error) {
        console.log(error);
        res.status(500).send(`ERROR AL INTENTAR AGREGAR EL PRODCUTO CON ID ${pid}`)
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { pid } = req.params;
        console.log(pid)
        await productService.deleteProduct(pid)
        res.status(200).send('PRODUCTO ELIMINADO EXITOSAMENTE')
    } catch (error) {
        console.log(error)
        res.status(500).send(`ERROR AL INTENTAR ELMININAR PRODUCTO CON ID ${pid}`)
    }
}

export const mockingProducts = async (req,res) => {
    try {
        let products = []
        for (let i = 0; i<100; i++) {
            products.push(createMockProducts())
            
        }
        res.status(200).json({payload: products})
    } catch (error) {
        console.log(error)
        res.status(500)
    }
}