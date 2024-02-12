
console.log("Entre a la carpeta login")
const infoLogin = document.querySelector("#loginForm")

infoLogin.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData (infoLogin);
    const objeto = {}

    data.forEach((value,key)=>(objeto[key]=value))
    console.log(objeto)
    fetch("/users/login", {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(objeto)})
    .then((resultado)=>{
        console.log(resultado)
        console.log(resultado.status)
        if(resultado.status == 200){
            console.log("salio")
            window.location.replace("/api/productos")
        }
        if(resultado.status == 400){
            alert("El usuario no existe")
        }
    })
    
})