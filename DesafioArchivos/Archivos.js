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

const productos = new Productos("products.txt");

const main = async () => {
  console.log(productos.archivo);
  console.log(await productos.getAll());
  await productos.save({ nombre: "Buzo", precio: 100 });
  await productos.update(1, { nombre: "Alfombra Actualizada", precio: 600 });
  console.log(await productos.getById(2));
  await productos.deleteAll();
  await productos.deleteById(1);
};

main();
