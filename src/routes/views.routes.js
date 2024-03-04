import { Router } from "express";
import productControler from "../dao/controllerDao/productController.js";
import passport from "passport";
import { useStrategy } from "../utils.js";

const router = Router();

router.get('/', async (req, res) => {
    const productList = await productControler.getProducts()
    res.render("index", { productList })
})

//form
router.get("/form", (req, res) => {
    res.render("form", {
        title: "Formulario",
        fileCss: "styles.css"
    })
});

const users = []

router.post("/user", (req, res) => {
    const { name, age } = req.body

    users.push({
        name,
        age
    })

    console.log(users);

    res.redirect("/")
})

router.get("/home", (req, res) => {
    res.render("home.hbs")
})

router.get("/products", (req, res) => {
    res.render("products.hbs", { title: "Productos", fileCss: "styles.css" })
})

router.get("/loginForm", (req, res) => {
    res.render("loginForm.hbs")
})

router.get("/registerForm", (req, res) => {
    res.render("registerForm.hbs")
})

router.get("/profile", useStrategy("jwt"), (req, res) => {
    const user = req.user
    return res.render("profile.hbs", { user })
})

export default router