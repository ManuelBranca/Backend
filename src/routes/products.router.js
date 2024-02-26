import { Router } from "express";
import { productManager } from "../index.js";
import productoDao from "../dao/controllerDao/productController.js";
import { productModel } from "../dao/models/productmodel.js";


const productsRouter = Router();

productsRouter.get('/', async (req, res) => {
    try {
        const { limit, page, query, sort } = req.query;
        const filter = {};
        if (query) {
            filter.stock = query;
        }
        let orden = 1;
        if (sort == "asc") {
            orden = 1;
        } else if (sort == "des") {
            orden = -1;
        }
        const paginateProducts = await productModel.paginate(filter, { page: page || 1, limit: limit || 8, sort: {price: orden} });
        console.log(paginateProducts);

        res.render("products.hbs",{paginateProducts})
    } catch (error) {
        console.log(error);
        res.send('ERROR AL INTENTAR RECIBIR LOS PRODUCTOS')
    }
})

productsRouter.get('/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        const products = await productoDao.getProductsById(pid)
        res.json(products)
    } catch (error) {
        console.log(error)
        res.send(`ERROR AL INTENTAR RECIBIR EL PRODUCTO CON ID ${pid}`)
    }
})


productsRouter.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const response = await productoDao.addProduct(req.body)
        console.log(response);
        res.json(response);
    } catch (error) {
        console.log(error);
        res.send(`ERROR AL INTENTAR AGREGAR PRODCUTO`)
    }
})

productsRouter.put('/:pid', async (req, res) => {
    const { pid } = req.params

    try {
        productoDao.updateProduct(pid, req.body);
        res.send("PRODUCTO ACTUALIZADO");
    } catch (error) {
        console.log(error);
        res.send(`ERROR AL INTENTAR AGREGAR EL PRODCUTO CON ID ${pid}`)
    }
})

productsRouter.delete('/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        await productoDao.deleteProduct(pid)
        res.send('PRODUCTO ELIMINADO EXITOSAMENTE')
    } catch (error) {
        console.log(error)
        res.send(`ERROR AL INTENTAR ELMININAR PRODUCTO CON ID ${pid}`)
    }
})


export default productsRouter;