import { productModel } from "../models/productmodel.js";

class productDao{
    async addProduct(producto) {
        return await productModel.create(producto);
    }

    async deleteProduct(id){
        return await productModel.deleteOne({_id:id});
    }

    async updateProduct(id,campos){
        return await productModel.updateOne({_id:id},{$set:campos})
    }

    async getProducts(){
        return await productModel.find();
    }

    async getProductsById(id){
        return await productModel.findById(id);
    }
}

const productControler = new productDao()
export default productControler
