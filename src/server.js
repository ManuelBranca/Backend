import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import handlebars from "express-handlebars";
import __dirname from "./dirname.js";
import viewRouter from "./routes/views.routes.js"
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import Handlebars from "handlebars";
import session from "express-session";
import MongoStore from "connect-mongo";
import usersRouter from "./routes/users.router.js";
import initializePassport from "./config/passportConfig.js";
import cors from "cors";
import cookieParser from "cookie-parser"
import { winstonLogger } from "./utils/utils.js"; 
import { Server } from "socket.io";
import mongoose from "mongoose";
import passport from "passport";
import { logger } from "./utils/utils.js";
import variables from "./config/config.js"
import swaggerUiExpress from "swagger-ui-express"
import { swaggerConfig } from "./utils/utils.js";

const PORT = variables.PORT;
const app = express();
const httpServer = app.listen(PORT, () =>
	logger.info(`Server listening on port ${PORT}`)
);


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//habilito permisos para apps externas
app.use(cors())
app.use(cookieParser(variables.ClaveSecreta))
//configuro mongo para que almacene las sesiones
app.use(session({
	store: MongoStore.create({
		mongoUrl: variables.mongoUrl,
		mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
		ttl: 300
	}),
	secret: "ManuelBranca",
	resave: false,
	saveUninitialized: false
}))

// le digo a mi aplicacion donde esta mi carpeta estatica
app.use(express.static(`${__dirname}/public`))
// config handlebars
app.engine('hbs', handlebars.engine({
	extname: 'hbs',
	defaultLayout: 'main',
	handlebars: allowInsecurePrototypeAccess(Handlebars)
}))

//configuracion de dirname
app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);

//configuracion de passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use(winstonLogger);
app.use('/api/docs', swaggerUiExpress.serve , swaggerUiExpress.setup(swaggerConfig))

// rutas
app.use("/", viewRouter);
app.use('/api/productos', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/users', usersRouter)

const socketServer = new Server(httpServer);

socketServer.on("connection", async (socket) => {

	logger.info("conexion exitosa")
	const arrayDeProductos = await productManager.getProducts()
	socket.emit("productos", arrayDeProductos);
	socket.on("Agregar_Producto", (data) => {
		productManager.addProduct(data);
	})
})



mongoose.connect(variables.mongoUrl)
	.then(logger.info("Se pudo conectar."))
	.catch((error) => { logger.error(error, "No se pudo conectar.") })


