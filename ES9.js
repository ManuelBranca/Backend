const fs = require('fs')

class ProductManager {

	constructor(filepath) {
		this.path = filepath;
		this.productos = [];
		this.nextProductId = 0;

		this.loadProductsFromFile();
	}

	saveProductsToFile() {
		const data = JSON.stringify(this.productos, null, 2);

		fs.writeFile(this.path, data, (err) => {
			if (err) {
				console.error('Error al guardar el archivo:', err);
			} else {
				console.log('Productos guardados en el archivo con éxito.');
			}
		});
	}

		loadProductsFromFile() {
			fs.readFile(this.path, 'utf8', (err, data) => {
				if (!err) {
					try {
						this.productos = JSON.parse(data);
						console.log('Productos cargados desde el archivo con éxito.');
					} catch (error) {
						console.error('Error al cargar el archivo:', error);
					}
				}
			});
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

		removeProduct(id) {
			const index = this.productos.findIndex(p => p.id === id);
			if (index !== -1) {
				this.productos.splice(index, 1);
				console.log("Producto eliminado con éxito.");
			} else {
				console.log("No se encontró un producto con el ID especificado.");
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


console.log("Comienzo!");
const manager = new ProductManager('productos.json');

console.log("=========================");
console.log("Productos en el array (VACIO):");
manager.getProducts();

console.log("=========================");
const producto1 = new Producto("Producto 1", "Descripción 1", 10.99, "imagen1.jpg", "P1", 100);
const producto2 = new Producto("Producto 1", "Descripción 1", 10.99, "imagen1.jpg", "P1", 100);
const producto3 = new Producto("Producto 3", "Descripción 2", 10.99, "imagen2.jpg", "P2", 100);

manager.addProducts(producto1);
manager.addProducts(producto2);
manager.addProducts(producto3);

console.log("=========================");
console.log("Productos en el array:");
manager.getProducts();

console.log("=========================");
console.log("Eliminar producto por ID");
manager.removeProduct(0);

console.log("=========================");
console.log("Productos en el array después de eliminar:");
manager.getProducts();

console.log("=========================");
console.log("Mostrar producto por ID:");
manager.getProductsById(1);

manager.saveProductsToFile('productos.json');
