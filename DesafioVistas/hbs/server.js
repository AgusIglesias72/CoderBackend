/* ---------------------- Modulos ----------------------*/
const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const fs = require("fs");

// Instancia de Server
const app = express();
const routerProductos = require("./src/routes/products.routes.js");

const DB_PRODUCTOS = JSON.parse(fs.readFileSync("products.json", "utf8"));
/* ---------------------- Middlewares ---------------------- */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));

/* ---------------------- Motor de Plantillas ----------------------*/
app.engine(
  "hbs",
  exphbs.engine({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: "hbs",
  })
);
app.set("views", "./views");
app.set("view engine", "hbs");

/* ---------------------- Rutas ----------------------*/
app.get("/", (req, res) => {
  res.render("vista", { DB_PRODUCTOS });
});
app.use("/api/productos", routerProductos);

/* ---------------------- Servidor ----------------------*/
const PORT = 8081;
const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto http://localhost:${PORT}`);
});
server.on("error", (error) => {
  console.error(`Error en el servidor ${error}`);
});
