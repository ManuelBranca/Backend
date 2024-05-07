const deleteButton = document.getElementById("deleteProduct")
const pid = deleteButton.dataset.info

deleteButton.addEventListener("click", (e) => {
    console.log("Hizo click")
    fetch(`/api/carts/products/${pid}`,  {method:"DELETE", headers:{"Content-Type":"application/json"}})
    .then(response =>{
        if(response.status == 200){
            location.reload();
        }
    })  
})

const purchase = document.getElementById("purchase")

purchase.addEventListener("click", (e) => {
    fetch(`/api/carts/purchase`,  {method:"POST", headers:{"Content-Type":"application/json"}})
    .then(response =>{
        if(response.status == 200){
            console.log("entre al status")
            window.location.replace("/products");
        }
    })  
})