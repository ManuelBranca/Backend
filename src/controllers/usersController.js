import {userService} from "../service/service.js"
import passport from "passport"
import { comparePassword, generateJwtToken } from "../utils/utils.js"

export const registerController = async (req, res) => {
    try {
        res.redirect("/loginForm")
    } catch (error) {
        console.log(error)
        res.send("Hubo un error")
    }
}

export const failRegister = ("/failRegister", async (req, res) => {
    res.status(401).send("Error al registrarse, intentelo de nuevo")
})

//Login
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userService.findUserByEmail(email);
        console.log(user, "logincontroller user");
        if (user == null) {
            return res.status(401).send("El usuario no existe")
        }
        if (comparePassword(password, user)) {
            const tokenInfo = {
                name: user.name,
                lastname: user.lastname,
                username: user.username,
                email: user.email,
                age: user.age,
                cartID: user.cartID,
                role: user.role
            }
            const newToken = generateJwtToken(tokenInfo)
            res.cookie("tokenCookie", newToken, {
                maxAge: "900000"
                // httpOnly:true
            })
            return res.status(200).send("Se logueo exitosamente")
        }
        return res.status(401).send("Credencial invalida")

    } catch (error) {
        console.log(error)
        res.status(500).send("Hubo un error")
    }
}

export const failLogin = async (req, res) => {
    console.log("error al ingresar")
    res.status(400).send("Error al ingresar, intentelo de nuevo")
}


export const logoutController = async (req, res) => {
    if (req.session.user) {
        req.session.destroy()
        return res.send("Usuario deslogueado")
    }
    res.status(500).send("No esta registrado")
}

export const githubLogin = async (req, res) => {
    passport.authenticate("github", {
        scope: ["user:email"]
    })
}

export const githubCallback = async (req, res) => {
    passport.authenticate("github", {
        failureRedirect: "/githubError",
        successRedirect: "/"
    })
}

export const testError = async (req,res) => {
    req.logger.fatal("hubo un error fatal")
    req.logger.error("logger de tipo error")
    req.logger.warning("logger de tipo warning")
    req.logger.info("logger de tipo info")
    req.logger.http("logger de tipo http")
    req.logger.debug("logger de tipo debug")
    res.send("Se ejecuto un test de los loggers")
}