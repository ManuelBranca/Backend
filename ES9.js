const express = require('express');
const fs = require('fs');

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
				this.saveProductsToFile(); 
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
			this.saveProductsToFile();
		} else {
			console.log("No se encontró un producto con el ID especificado.");
		}
	}

	getProducts() {
		return this.productos;
	}

	getProductsById(id) {
		const producto = this.productos.find(p => p.id === id);
		if (producto) {
			return producto;
		} else {
			console.log("No se encontró un producto con el ID especificado.");
			return null;
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

const app = express();
const port = 3000;


app.use(express.json());


const manager = new ProductManager('productos.json');


app.get('/productos', (req, res) => {
	const productos = manager.getProducts();
	res.json(productos);
});


app.get('/productos/:id', (req, res) => {
	const idProducto = parseInt(req.params.id);
	const producto = manager.getProductsById(idProducto);
	if (producto) {
		res.json(producto);
	} else {
		res.status(404).json({ error: 'Producto no encontrado' });
	}
});


app.post('/productos', (req, res) => {
	const nuevoProducto = req.body;
	manager.addProducts(nuevoProducto);
	res.json({ mensaje: 'Producto agregado con éxito' });
});


app.delete('/productos/:id', (req, res) => {
	const idProducto = parseInt(req.params.id);
	manager.removeProduct(idProducto);
	res.json({ mensaje: 'Producto eliminado con éxito' });
});


app.listen(port, () => {
	console.log(`Servidor Express escuchando en el puerto ${port}`);
});

