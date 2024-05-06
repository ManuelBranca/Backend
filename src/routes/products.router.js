import { Router } from "express";
import productoDao from "../service/dao/productDao.js";
import { productModel } from "../service/models/productmodel.js";
import {
    getProducts, getProductsById, createProduct,
    updateProduct, deleteProduct, mockingProducts
} from "../controllers/productController.js";
import { authorization, useStrategy } from "../utils/utils.js";

const productsRouter = Router();

productsRouter.get('/', getProducts)

productsRouter.get('/:pid', getProductsById)

productsRouter.post('/', useStrategy("jwt"), authorization(["admin","premium"]), createProduct)

productsRouter.put('/:pid',useStrategy("jwt"), authorization(["admin"]), updateProduct)

productsRouter.delete('/:pid',useStrategy("jwt") , authorization(["admin","premium"]), deleteProduct)

productsRouter.post('/mockingProducts', mockingProducts)

export default productsRouter;