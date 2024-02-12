import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
    res.render("index", {
        title: "Mi titulo",
        nombre: "Manuel",
        fileCss: "styles.css"
    })
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

router.get("/loginForm", (req,res) =>{
    res.render("loginForm.hbs")
})

router.get("/registerForm", (req,res) =>{
    res.render("registerForm.hbs")
})

router.get("/profile", (req,res) =>{
    console.log(req.session)
    if(req.session.user){
    const {name,lastname,username,email} = req.session.user[0]
    const user = {name,lastname,username,email}
    return res.render("profile.hbs", { user })
    } 
    res.status(400).send("No estas autorizado")
})

export default router