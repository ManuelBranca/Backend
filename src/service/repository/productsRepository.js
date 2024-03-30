

class productRepository {
    constructor(dao) {
        this.dao = dao;
    }

    addProduct = (producto) => {
        return this.dao.addProduct(producto)
    }

    deleteProduct = (id) => {
        return this.dao.deleteProduct(id)
    }

    updateProduct = (id, campos) => {
        return this.dao.updateProduct(id,campos)
    }

    getProducts = () => {
        return this.dao.getProducts()
    }

    getProductsById = (id) => {
        return this.dao.getProductsById(id)
    }

    getAllProducts = (limit, page, query, sort) => {
        return this.dao.getAllProducts(limit, page, query, sort)
    }
}

export default productRepository
