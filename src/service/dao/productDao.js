import { sendEmail } from "../../utils/utils.js";
import { productModel } from "../models/productmodel.js";

class productDao {
    async addProduct(producto, email) {
        producto.owner = email;
        return await productModel.create(producto);
    }

    async deleteProduct(id) {
        const producto = await this.getProductsById(id)
        await sendEmail(producto.owner, producto)
        return await productModel.deleteOne({ _id: id });
    }

    async updateProduct(id, campos) {
        return await productModel.updateOne({ _id: id }, { $set: campos })
    }

    async getProducts() {
        return await productModel.find();
    }

    async getProductsById(id) {
        return await productModel.findById(id);
    }

    async getAllProducts(limit, page, query, sort) {
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
        const paginateProducts = await productModel.paginate(filter, { page: page || 1, limit: limit || 8, sort: { price: orden } });
        return paginateProducts
    }
}

const productControler = new productDao()
export default productControler
