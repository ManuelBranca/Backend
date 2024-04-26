import productRepository from "./repository/productsRepository.js";
import productControler from "./dao/productDao.js";
import userRepository from "./repository/userRepository.js";
import { carritoDao } from "./dao/cartDao.js";
import userDao from "./dao/usersDao.js";
import cartRepository from "./repository/cartRepository.js";
import { fileDao } from "./dao/fileDao.js";
import fileRepository from "./repository/fileRepository.js";



export const productService = new productRepository(productControler)
export const userService = new userRepository(userDao)
export const cartService = new cartRepository(carritoDao)
export const fileService = new fileRepository(fileDao)


