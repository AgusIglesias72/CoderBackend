const express = require("express");
const multer = require("multer");
const routerProductos = express.Router();
const Producto = require("../Productos/Producto");

const productos = new Producto("products.json");

routerProductos.get("/", (req, res) => {
  productos
    .getAll()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

routerProductos.post("/", (req, res) => {
  const producto = new Producto(req.body.nombre, req.body.precio);
  productos
    .save(producto)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

routerProductos.get("/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  productos
    .getById(Number(id))
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

routerProductos.put("/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, precio, cantidad } = req.body;
  productos
    .update(Number(id), { nombre, precio, cantidad })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

routerProductos.delete("/all", (req, res) => {
  productos
    .deleteAll()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

routerProductos.delete("/:id", (req, res) => {
  const { id } = req.params;
  productos
    .deleteById(Number(id))
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

module.exports = routerProductos;
