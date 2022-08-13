const fs = require("fs/promises");

class Productos {
  constructor(archivo) {
    this.archivo = archivo;
  }
  async getAll() {
    try {
      const objs = JSON.parse(await fs.readFile(this.archivo, "utf8"));
      return objs;
    } catch (error) {
      return console.log(error);
    }
  }
  async getById(id) {
    try {
      const objs = await this.getAll();
      const indexObj = objs.findIndex((obj) => obj.id === id);

      if (indexObj === -1) {
        return "No se encontro el producto";
      } else {
        return objs[indexObj];
      }
    } catch (error) {
      return console.log(error);
    }
  }
  async getRandom() {
    try {
      const objs = await this.getAll();
      const objsArray = objs.map((obj) => obj.id);
      const randomIndex = Math.floor(Math.random() * objsArray.length);
      return objs[randomIndex];
    } catch (error) {
      return console.log(error);
    }
  }
  async deleteAll() {
    try {
      let objs = JSON.parse(await fs.readFile(this.archivo, "utf8"));
      objs = [];
      await fs.writeFile(this.archivo, JSON.stringify(objs, null, 2));
    } catch (error) {
      return console.log(error);
    }
  }
  async deleteById(id) {
    try {
      const objs = await this.getAll();
      const indexObj = objs.findIndex((obj) => obj.id === id);

      if (indexObj === -1) {
        return "No se encontro el producto";
      } else {
        objs.splice(indexObj, 1);
        await fs.writeFile(this.archivo, JSON.stringify(objs, null, 2));
      }
    } catch (error) {
      return console.log(error);
    }
  }
}

class Producto {
  constructor(nombre, precio, cantidad) {
    this.nombre = nombre;
    this.precio = precio;
    this.cantidad = cantidad;
    this.archivo = "./products.json";
  }
  generarPlantilla(color, fondo) {
    return `
      <div style="color: ${color}; background-color: ${fondo}">
        <h1>${this.nombre}</h1>
        <h2>${this.precio}</h2>
        <h2>${this.cantidad}</h2>
      </div>
    `;
  }
  async save(prod) {
    try {
      const objs = await this.getAll();
      if (objs && objs.length > 0) {
        prod.id = objs[objs.length - 1].id + 1;
      } else prod.id = 1;

      objs.push(prod);

      await fs.writeFile(this.archivo, JSON.stringify(objs, null, 2));
      return `Se guardo el producto con el id ${prod.id}`;
    } catch (error) {
      return console.log(error);
    }
  }
  async update(id, contenido) {
    try {
      const objs = await this.getAll();
      const indexObj = objs.findIndex((obj) => obj.id === id);

      if (indexObj === -1) {
        return "No se encontro el producto";
      } else {
        objs[indexObj] = { id, ...contenido };
        await fs.writeFile(this.archivo, JSON.stringify(objs, null, 2));
        return "Se actualizo el producto";
      }
    } catch (error) {
      return console.log(error);
    }
  }
}

module.exports = Producto;
module.exports = Productos;
