const socket = io();

const productosDiv = document.querySelector("#productos");
const formulario = document.querySelector("#formulario");


formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    console.log(formulario, "ES ACA");
    const formData = new FormData(formulario);
    console.log(formData);
    const producto = {
        titulo: formData.get("title"),
        descripcion: formData.get("description"),
        price: formData.get("price"),
        thumbnail: formData.get("image"),
        code: formData.get("code"),
        stock: formData.get("stock")
    };
    socket.emit("Agregar_Producto", producto);
})

socket.on("productos", (productos) => {
    console.log(productos);
    productosDiv.innerHTML = "";
    productos.forEach(element => {
        const div = document.createElement("div");
        div.innerHTML = `
    <h3>${element.titulo}</h3>
    <img src=${element.thumbnail} alt=""/>
    <p>${element.descripcion}</p>
    <p>${element.price}</p>
    <p>${element.stock}</p>
    <button id="agregarCarrito">Agregar al carrito</button>
    <button class="borrarProductos">Borrar producto</button>
    `
        productosDiv.appendChild(div);
    });
})


