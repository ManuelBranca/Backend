import { Router } from "express";
import userController from "../dao/controllerDao/usersController.js";
import { authUser } from "../utils.js";
import passport from "passport";
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
usersRouter.post("/login", passport.authenticate("login",
    {
        failureRedirect: "/users/failLogin",
        successRedirect: "/"
    }
))

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

usersRouter.get("/GitHub", passport.authenticate("github",{
    scope:["user:email"]
}))

usersRouter.get("/githubcallback", passport.authenticate("github",{
    failureRedirect: "/githubError",
    successRedirect: "/"
}))

export default usersRouter;