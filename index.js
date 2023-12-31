import express from "express";
import { ProductManager } from "./productManager.js";
import { CartManager } from "./cartManager.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import viewRouter from "./routes/views.routes.js"

import { Server } from "socket.io";

const PORT = 8080;
const app = express();
const httpServer = app.listen(PORT,() => 
console.log(`Server listening on port ${PORT}`)
);



export const productManager = new ProductManager();
export const cartManager = new CartManager();



app.use(express.json())
app.use('/api/productos', productsRouter)
app.use('/api/carts', cartsRouter)
app.use(express.urlencoded({ extended: true}))

app.engine('hbs', handlebars.engine({
	extname: 'hbs',
	defaultLayout: 'main'
}))

app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);

app.use(express.static(`${__dirname}/public`))

app.use("/", viewRouter);

const socketServer = new Server(httpServer);

socketServer.on("connection", async(socket) => {
	
	console.log("conexion exitosa")
	const arrayDeProductos = await productManager.getProducts()
	socket.emit("productos", arrayDeProductos);
	socket.on("Agregar_Producto", (data) =>{
		productManager.addProduct(data);
	})
})


