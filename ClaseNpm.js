function createNumbers(min, max) {
  var numbers = [];
  for (var i = min; i <= max; i++) {
    let random = Math.random();
    console.log(random);
    let ranNumber = Math.floor(random * (max - min + 1) + min);
    numbers.push(ranNumber);
  }
  return numbers;
}

const listaOcurr = {
  id: 1,
  nombre: "Ocurrencia 1",
};

console.log(listaOcurr.hasOwnProperty("iad"));
