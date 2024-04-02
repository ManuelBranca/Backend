import { Router } from "express";
import {
    registerController, failRegister, loginController,
    failLogin, logoutController, githubLogin, githubCallback, testError
} from "../controllers/usersController.js";
import passport from "passport";


const usersRouter = Router();

//register
usersRouter.post("/register",passport.authenticate("register",{session: false}) , registerController)

usersRouter.get("/failRegister", failRegister)

//Login
usersRouter.post("/login", loginController)

usersRouter.get("/failLogin", failLogin)


usersRouter.post("/logout", logoutController)

usersRouter.get("/GitHub", githubLogin)

usersRouter.get("/githubcallback", githubCallback)

usersRouter.get("/testlogger", testError)

export default usersRouter;