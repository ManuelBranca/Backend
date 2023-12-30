import { Router } from "express";

const router = Router();

router.get('/',(req,res) =>{
	res.render("index",{
		title: "Mi titulo",
		nombre: "Manuel",
        fileCss: "styles.css"
	})
})

//form
router.get("/form",(req,res)=>{
    res.render("form",{
        title: "Formulario",
        fileCss: "styles.css"
    })
});

const users = []

router.post("/user", (req,res) =>{
    const {name, age} = req.body

    users.push({
        name,
        age
    })

    console.log(users);

    res.redirect("/")
})  

router.get("/home", (req,res) =>{
    res.render("home.hbs")
})

export default router