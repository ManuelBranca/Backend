
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import passport from "passport";
import variables, { enviroment } from "../config/config.js"
import { fakerES as faker } from "@faker-js/faker"
import winston from "winston"

export function createHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

export function comparePassword(password, user) {
    return bcrypt.compareSync(password, user.password)
}

export function cookieExtractor(req) {
    let token = null;
    if (req.cookies && req) {
        token = req.cookies["tokenCookie"]
        return token;
    } else {
        console.log("No se encontro la cookie")
        return false
    }
}

export function generateJwtToken(user) {
    return jwt.sign({ user }, "soyUnSecreto", { expiresIn: "9000s" })
}

export function useStrategy(strategy) {
    return async (req, res, next) => {
        passport.authenticate(strategy, function (error, user, info) {
            if (error) {
                return next();
            }
            if (!user) {
                return res.status(400).send("Permiso denegado!")
            }
            req.user = user
            next();
        })(req, res, next)
    }
}

export const authorization = (roles) => {
    return async (req, res, next) => {
        console.log(req.user, "ACA")
        if (!req.user) {
            return res.status(401).send("usuario no autorizado")
        }
        if (roles.includes(req.user.role)) {

            return next()
        }
        return res.status(403).send("No tiene el rol necesario")
    }
}

export const purchaseAux = (carrito) => {
    for (let i = 0; i < carrito.products.length; i++) {
        console.log(carrito.products[i])
        if (carrito.products[i].product_id.stock < carrito.products[i].quantity) {
            return -1;
        }

    }
    return 1;

}

export const createMockProducts = () => {
    return {
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price({ min: 1000, max: 100000 }),
        code: faker.location.zipCode(),
        status: true,
        thumbnail: faker.image.urlLoremFlickr({ width: 152, height: 152 }),
        stock: faker.finance.amount({ min: 1, max: 20 })
    };
}

let customLevelOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: "red",
        error: "black",
        warning: "yellow",
        info: "blue",
        http: "white",
        debug: "green",
    },
}

winston.addColors(customLevelOptions.colors);

export let logger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports: [
        new winston.transports.Console({
            level: "info",
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: "../logs/errorsLogger",
            level: "error"
        })
    ]
})

export let loggerDev = winston.createLogger({
    levels: customLevelOptions.levels,
    transports: [
        new winston.transports.Console({
            level: "debug",
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename: "../logs/errorsLogger",
            level: "error"
        })
    ]
})



export const winstonLogger = (req,res,next) => {
    enviroment == "prot" ? req.logger = logger : req.logger = loggerDev
    
    req.logger.http(`${req.method}, en ${req.url},
    ubicacion ${new Date().toLocaleDateString()}, a las ${new Date().toLocaleTimeString()}`)

    req.logger.info(`${req.method}, en ${req.url},
    ubicacion ${new Date().toLocaleDateString()}, a las ${new Date().toLocaleTimeString()}`)

    next()
}