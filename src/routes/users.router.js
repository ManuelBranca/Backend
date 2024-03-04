import { Router } from "express";
import userController from "../dao/controllerDao/usersController.js";
import { authUser } from "../utils.js";
import passport from "passport";
import userControllerInst from "../dao/controllerDao/usersController.js";
import { generateJwtToken } from "../utils.js"; 
import { comparePassword } from "../utils.js";

const usersRouter = Router();

//register
usersRouter.post("/register", passport.authenticate("register",
    {
        failureRedirect: "/users/failRegister",
        successRedirect: "/loginForm"
    }

))

usersRouter.get("/failRegister", async (req, res) => {
    res.status(401).send("Error al registrarse, intentelo de nuevo")
})

//Login
usersRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await userControllerInst.findUserByEmail(email);
    if (user[0] == null) {
        return res.status(401).send("El usuario no existe")
    }
    if (comparePassword(password, user[0])) {
        const tokenInfo = {
            name: user.name,
            lastname:user.lastname ,
            username: user.username,
            email: user.email,
            age: user.age,
            cartID: user.cartID,
        }
        const newToken = generateJwtToken(tokenInfo)
        console.log(newToken)
        res.cookie("tokenCookie",newToken,{
            maxAge:"900000"
            // httpOnly:true
        })
        res.status(200).send("Se logueo exitosamente")
    } else {
        res.status(401).send("Credencial invalida")
    }
})

usersRouter.get("/failLogin", async (req, res) => {
    console.log("error al ingresar")
    res.status(400).send("Error al ingresar, intentelo de nuevo")
})


usersRouter.post("/logout", async (req, res) => {
    if (req.session.user) {
        req.session.destroy()
        return res.send("Usuario deslogueado")
    }
    res.send("No esta registrado")
})

usersRouter.get("/GitHub", passport.authenticate("github", {
    scope: ["user:email"]
}))

usersRouter.get("/githubcallback", passport.authenticate("github", {
    failureRedirect: "/githubError",
    successRedirect: "/"
}))

export default usersRouter;