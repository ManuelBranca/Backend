import { Router } from "express";
import productoDao from "../service/dao/productDao.js";
import { productModel } from "../service/models/productmodel.js";
import {
    getProducts, getProductsById, createProduct,
    updateProduct,deleteProduct, mockingProducts
} from "../controllers/productController.js";
import { authorization } from "../utils/utils.js";

const productsRouter = Router();

productsRouter.get('/', getProducts)

productsRouter.get('/:pid', getProductsById)

productsRouter.post('/', authorization(["admin"]), createProduct)

productsRouter.put('/:pid', authorization(["admin"]), updateProduct)

productsRouter.delete('/:pid', authorization(["admin"]), deleteProduct)

productsRouter.post('/mockingProducts', mockingProducts)

export default productsRouter;