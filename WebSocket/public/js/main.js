const socket = io();

socket.on("from-server-mensaje", (data) => {
  render(data);
});

function render(data) {
  const cuerpoMensajesHTML = data
    .map((producto) => {
      return `
      <tr>
        <td>${producto.nombre}</td>
        <td>${producto.precio}</td>
    </tr>
        `;
    })
    .join("\n");
  // ;
  document.querySelector("#Productos").innerHTML = `
        <table class="table table-dark">
        <tr style="color: yellow;">
          <th>Nombre</th>
          <th>Precio</th>
        </tr>
  ${cuerpoMensajesHTML}
  </table>`;
}

function enviarMensaje() {
  const inputNombre = document.querySelector("#nombre");
  const inputPrecio = document.querySelector("#precio");

  const mensaje = {
    nombre: inputNombre.value,
    precio: inputPrecio.value,
  };

  socket.emit("from-client-mensaje", mensaje);
}
