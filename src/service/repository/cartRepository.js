
class cartRepository {
    constructor(dao) {
        this.dao = dao;
    }

    createCart = () => {
        return this.dao.createCart()
    }

    createProduct = (product) => {
        return this.dao.createProduct(product)
    }

    getCartById = (id) => {
        return this.dao.getCartById(id)
    }

    delectProductInCart = (cid,pid) => {
        return this.dao.delectProductInCart(cid,pid)
    }

    deleteAllProducts = (cid) => {
        return this.dao.deleteAllProducts(cid)
    }

    addProduct = (cid,pid) => {
        return this.dao.addProduct(cid,pid)
    }

    purchase = (cid) => {
        return this.dao.purchase(cid);
    }
}

export default cartRepository;