import userDao from "../service/dao/usersDao.js"

export const registerController = async (req, res) => {
    passport.authenticate("register",
        {
            failureRedirect: "/users/failRegister",
            successRedirect: "/loginForm"
        }
    )
}

export const failRegister = ("/failRegister", async (req, res) => {
    res.status(401).send("Error al registrarse, intentelo de nuevo")
})

//Login
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userDao.findUserByid(email);
        if (user[0] == null) {
            return res.status(401).send("El usuario no existe")
        }
        if (comparePassword(password, user[0])) {
            const tokenInfo = {
                name: user.name,
                lastname: user.lastname,
                username: user.username,
                email: user.email,
                age: user.age,
                cartID: user.cartID,
            }
            const newToken = generateJwtToken(tokenInfo)
            console.log(newToken)
            res.cookie("tokenCookie", newToken, {
                maxAge: "900000"
                // httpOnly:true
            })
            return res.status(200).send("Se logueo exitosamente")
        }
        return res.status(401).send("Credencial invalida")

    } catch (error) {
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

export default usersRouter;