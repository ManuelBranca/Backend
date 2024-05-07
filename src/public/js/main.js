console.log("Entre al archivo")
const button = document.querySelector("#logout")

button.addEventListener("click", async (e) => {
    console.log("Entre al evento")
    const response = await fetch ("http://localhost:8080/users/logout", {method: "POST"})
    if(response.status == 200){
        window.location.replace("/loginForm")
    }
})

const addProduct = document.querySelectorAll(".addProduct")

addProduct.forEach(button => {
    const pid = button.dataset.info
    button.addEventListener("click", (e) =>{
        console.log("Entre al evento addproduct")
        fetch(`/api/carts/products/${pid}`, {method:"POST", headers:{"Content-Type":"application/json"}})
    })
})