import { Router } from "express";
import userController from "../dao/controllerDao/usersController.js";
import { authUser } from "../utils.js";
const usersRouter = Router();

usersRouter.post("/register", async (req, res) => {
    const { name, lastname, username, email, password} = req.body;
    const esta = await userController.findUserByEmail(email);
    console.log(esta)
    console.log(req.body)
    if(esta[0] == null){
        const user = {name, lastname, username, email, password};
        await userController.addUser(user)
        return res.send("Se creo el usuario")
    }
    return res.status(400).send("El usuario ya existe")
})

usersRouter.post("/login", async (req, res) => {
    console.log(req.body)
    const {email, password} = req.body;
    console.log(req.body);
    const existe = await userController.findUserByEmail(email);
    console.log(existe)
    if(existe[0] == null){
        console.log("el usuario no existe")
        return res.status(400).send("El usuario no existe")
    }
    if(existe[0].password == password){
        req.session.user = existe;
        console.log("el usuario se logueo")
        return res.status(200).send("/profile")
    } else {
        console.log("Credencial invalida")
        res.status(400).send("Credencial invalida")
    }
})

usersRouter.post("/logout", async (req, res) => {
    if(req.session.user){
        req.session.destroy()
        return res.send("Usuario deslogueado")
    }
    res.send("No esta registrado")
})



export default usersRouter;