import productRepository from "./repository/productsRepository.js";
import productControler from "./dao/productDao.js";
import userRepository from "./repository/userRepository.js";
import { carritoDao } from "./dao/cartDao.js";
import userDao from "./dao/usersDao.js";
import cartRepository from "./repository/cartRepository.js";



export const productService = new productRepository(productControler)
export const userService = new userRepository(userDao)
export const cartService = new cartRepository(carritoDao)

