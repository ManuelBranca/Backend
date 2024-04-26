import { fileService, userService } from "../service/service.js"
import passport from "passport"
import { comparePassword, generateJwtToken } from "../utils/utils.js"

const createFiles = async (req) => {
    let fileCreated;
    let fileCreatedCDD;
    let fileCreatedEDC;
    let ids = {
        Identificacion: null,
        Comprobante_de_domicilio: null,
        Estado_de_cuenta: null
    };
    // Creando file de identificacion 
    const { Identificacion } = req.files;
    if (Identificacion) {
        Identificacion[0].type = "Identificacion";
        ids.Identificacion = await fileService.createFile(Identificacion[0]);
    }
    // Creando file de Comprobante de domicilio
    const { Comprobante_de_domicilio } = req.files;
    if (Comprobante_de_domicilio) {
        Comprobante_de_domicilio[0].type = "Comprobante de domicilio";
        ids.Comprobante_de_domicilio = await fileService.createFile(Comprobante_de_domicilio[0]);
    }
    // Creando file de Estado de cuenta 
    const { Estado_de_cuenta } = req.files;
    if (Estado_de_cuenta) {
        Estado_de_cuenta[0].type = "Estado de cuenta";
        ids.Estado_de_cuenta = await fileService.createFile(Estado_de_cuenta[0]);
    }

    return ids;
}

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

export const testError = async (req, res) => {
    req.logger.fatal("hubo un error fatal")
    req.logger.error("logger de tipo error")
    req.logger.warning("logger de tipo warning")
    req.logger.info("logger de tipo info")
    req.logger.http("logger de tipo http")
    req.logger.debug("logger de tipo debug")
    res.send("Se ejecuto un test de los loggers")
}

export const changeRole = async (req, res) => {
    const { email } = req.user;
    const user = await userService.findUserByEmail(email);
    const documentos = user.documents[0];
    if (documentos.Identificacion == null || documentos.Comprobante_de_domicilio == null || documentos.Estado_de_cuenta == null) {
        return res.status(400).send("No tienes los documentos necesarios")
    }
    user.role == "premium" ? user.role = "user" : user.role = "premium";
    user.save();
    return res.status(200).send("Se cambio el rol del usuario: " + email + " ahora su rol es " + user.role)
}


export const uploadFiles = async (req, res) => {
    const ids = await createFiles(req)
    const { email } = req.user;
    const user = await userService.findUserByEmail(email);
    const newRef = {
        Identificacion: ids.Identificacion ? ids.Identificacion._id : null,
        Comprobante_de_domicilio: ids.Comprobante_de_domicilio ? ids.Comprobante_de_domicilio._id : null,
        Estado_de_cuenta: ids.Estado_de_cuenta ? ids.Estado_de_cuenta._id : null
    }
    user.documents[0] = newRef;
    user.save()

    res.status(200).send("Se subieron los archivos")
}