import { Router } from "express";
import passport from "passport";
import userControllerInst from "../service/dao/usersDao.js";
import { generateJwtToken } from "../utils/utils.js"; 
import { comparePassword } from "../utils/utils.js";
import { registerController, failRegister , loginController,
    failLogin, logoutController, githubLogin, githubCallback } from "../controllers/usersController.js";

const usersRouter = Router();

//register
usersRouter.post("/register", registerController)

usersRouter.get("/failRegister", failRegister)

//Login
usersRouter.post("/login", loginController)

usersRouter.get("/failLogin", failLogin)


usersRouter.post("/logout", logoutController)

usersRouter.get("/GitHub", githubLogin)

usersRouter.get("/githubcallback", githubCallback)

export default usersRouter;