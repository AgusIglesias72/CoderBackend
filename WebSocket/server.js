/* ---------------------- Modulos ----------------------*/
const express = require("express");
const path = require("path");
const fs = require("fs");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const axios = require("axios");

// Instancia de Server
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const routerProductos = require("./src/routes/products.routes.js");

const DB_PRODUCTOS = JSON.parse(fs.readFileSync("products.json", "utf8"));
/* ---------------------- Middlewares ---------------------- */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));

/* ---------------------- Rutas ----------------------*/
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public", "index.html"));
});

app.use("/api/productos", routerProductos);

/* ---------------------- Servidor ----------------------*/
const PORT = 8081;
const URL = `http://localhost:${PORT}`;
const server = httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${URL}`);
});

/* ---------------------- WebSocket ----------------------*/

io.on("connection", (socket) => {
  socket.emit("from-server-mensaje", DB_PRODUCTOS);

  socket.on("from-client-mensaje", (mensaje) => {
    axios.post(`${URL}/api/productos`, {
      nombre: mensaje.nombre,
      precio: mensaje.precio,
    });
    io.sockets.emit("from-server-mensaje", { DB_PRODUCTOS });
  });
});
