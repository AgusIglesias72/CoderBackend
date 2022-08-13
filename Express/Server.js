const express = require("express");
const Producto = require("./Producto");
const Productos = require("./Producto");
const app = express();

// const producto = new Producto("Lapiz", 10, 100);

const PORT = 8080;
const productos = new Productos("products.json");

app.get("/", (req, res) => {
  req.res.send(`
    <h1 style="color: blue">Hola mundo</h1>
  `);
});

app.get("/productos", (req, res) => {
  productos.getAll().then((data) => {
    res.send(data);
  });
});

app.get("/productoRandom", (req, res) => {
  productos.getRandom().then((data) => {
    res.send(data);
  });
});

const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto
    ${server.address().port}`);
});
