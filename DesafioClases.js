class Usuario {
  constructor(nombre, apellido, libros, mascotas) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
  }

  getFullName() {
    return `${this.nombre} ${this.apellido}`;
  }
  addMascota(mascota) {
    this.mascotas.push(mascota);
  }
  contarMascotas() {
    return this.mascotas.length;
  }
  addLibro(nombre, autor) {
    this.libros.push({ nombre: nombre, autor: autor });
  }
  getLibros() {
    let libros = [];
    this.libros.map((libro) => {
      libros.push(libro.nombre);
    });
    return libros;
  }
}

const usuario = new Usuario("Juan", "Perez", [], []);

usuario.addLibro("El señor de los anillos", "J.R.R. Tolkien");
usuario.addLibro("Harry Potter", "J.K. Rowling");

usuario.addMascota("Perro");
usuario.addMascota("Gato");

console.log(usuario.getFullName());
console.log(usuario.getLibros());
console.log(usuario.contarMascotas());
console.log(usuario);
