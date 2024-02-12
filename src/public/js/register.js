const infoRegister = document.querySelector("#registerForm")

infoRegister.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData (infoRegister);
    const objeto = {}

    data.forEach((value,key)=>(objeto[key]=value))
    console.log(objeto)
    fetch("/users/register", {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(objeto)})
    .then((resultado)=>{
        console.log(resultado)
        console.log(resultado.status)
        if(resultado.status == 200){
            console.log("se registro correctamente")
            window.location.replace("/loginForm")
        }
        if(resultado.status == 400){
            alert("campo invalido")
        }
    })

})