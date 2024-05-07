import { Router } from "express";
import productControler from "../service/dao/productDao.js";
import { useStrategy } from "../utils/utils.js";
import { cartService } from "../service/service.js";



const router = Router();

router.get('/',useStrategy("jwt"), async (req, res) => {
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

router.get("/cartView", useStrategy("jwt"), async (req,res) => {
    const user = req.user
    const cart = await cartService.getCartById(user.cartID)
    console.log(cart)
    res.render("cartView.hbs", {carrito: cart})
})

export default router