export const generateCartErrorInfo = (cart) => {
    return `Hubo un error de tipo carrito invalido
    se esperaba un carrito con formato de tipo: 
    -> id: type mongoid, se obtuvo ${cart._id} 
    -> products: type array, se obtuvo ${cart.products}
    `
}

