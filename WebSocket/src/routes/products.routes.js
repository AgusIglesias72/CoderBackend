const express = require("express");
const multer = require("multer");
const routerProductos = express.Router();
const Producto = require("../Productos/Producto");

routerProductos.get("/", (req, res) => {
  const producto = new Producto();
  producto
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
  producto
    .save(producto)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

routerProductos.get("/:id", (req, res) => {
  const producto = new Producto();
  const { id } = req.params;
  console.log(id);
  producto
    .getById(Number(id))
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

routerProductos.put("/:id", (req, res) => {
  const producto = new Producto();
  const { id } = req.params;
  const { nombre, precio, cantidad } = req.body;
  producto
    .update(Number(id), { nombre, precio, cantidad })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

routerProductos.delete("/all", (req, res) => {
  const producto = new Producto();
  producto
    .deleteAll()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

routerProductos.delete("/:id", (req, res) => {
  const producto = new Producto();
  const { id } = req.params;
  producto
    .deleteById(Number(id))
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

module.exports = routerProductos;
