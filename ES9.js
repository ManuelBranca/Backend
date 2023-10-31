class ProductManager {
	
	constructor() {
		this.productos = [];
		this.nextProductId = 0;
	}

	addProducts(producto) {
		if (!this.productos.some(p => p.code === producto.code)) {
			if (
				producto.titulo &&
				producto.descripcion &&
				producto.price &&
				producto.thumbnail &&
				producto.code &&
				producto.stock
			) {

				producto.id = this.nextProductId++;
				this.productos.push(producto);
				console.log("Producto agregado con éxito.");
			} else {
				console.log("Faltan campos obligatorios para agregar el producto.");
			}
		} else {
			console.log("Ya existe un producto con el mismo código.");
		}
	}

	getProducts() {
		console.log(this.productos);
	}

	getProductsById(id) {
		const producto = this.productos.find(p => p.id === id);
		if (producto) {
			console.log(producto);
		} else {
			console.log("No se encontró un producto con el ID especificado.");
		}
	}
}

class Producto {
	constructor(titulo, descripcion, price, thumbnail, code, stock) {
		this.titulo = titulo;
		this.descripcion = descripcion;
		this.price = price;
		this.thumbnail = thumbnail;
		this.code = code;
		this.stock = stock;
	}
}


console.log("Comienzo!")
const manager = new ProductManager();


console.log("=========================")
console.log("Productos del array (VACIO)")
manager.getProducts();


console.log("=========================")
const producto1 = new Producto("Producto 1", "Descripcion 1", 10.99, "imagen1.jpg", "P1", 100);
const producto2 = new Producto("Producto 1", "Descripcion 1", 10.99, "imagen1.jpg", "P1", 100);
const producto3 = new Producto("Producto 3", "Descripcion 2", 10.99, "imagen2.jpg", "P2", 100);

manager.addProducts(producto1);
manager.addProducts(producto2);
manager.addProducts(producto3);

console.log("=========================")
console.log("Productos del array")
manager.getProducts();

console.log("=========================")
console.log("Muestro el obtenido por ID")
manager.getProductsById(1);
