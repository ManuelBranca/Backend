import { Router } from "express";
import {
    registerController, failRegister, loginController,
    failLogin, logoutController, githubLogin, githubCallback, testError,
    changeRole,
    uploadFiles,
    inactiveUsers
} from "../controllers/usersController.js";
import passport from "passport";
import { authorization, filesUploader, useStrategy } from "../utils/utils.js";


const usersRouter = Router();
const fields = [
    {
        name: "Identificacion",
        maxCount: 1
    },
    {
        name: "Comprobante_de_domicilio",
        maxCount: 1
    },
    {
        name: "Estado_de_cuenta",
        maxCount: 1
    }
]

//register
usersRouter.post("/register",passport.authenticate("register",{session: false}) , registerController)

usersRouter.get("/failRegister", failRegister)

//Login
usersRouter.post("/login", loginController)

usersRouter.get("/failLogin", failLogin)


usersRouter.post("/logout", useStrategy("jwt") ,logoutController)

usersRouter.get("/GitHub", githubLogin)

usersRouter.get("/githubcallback", githubCallback)

usersRouter.get("/testlogger", testError)

usersRouter.put("/changeRole/premium",useStrategy("jwt") ,authorization(["user","premium"]), changeRole)

usersRouter.post("/uploadFiles", useStrategy("jwt"), filesUploader.fields(fields) , uploadFiles)

usersRouter.delete("/inactiveUsers", useStrategy("jwt"),authorization(["admin"]), inactiveUsers)


export default usersRouter;