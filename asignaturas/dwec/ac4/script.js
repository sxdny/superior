// constructor planeta
function Planeta() {
  this.nombre = "Planeta";
  this.volumen = 100000000;
  this.vecesTamanyoSol = 1000000;
  this.distanciaSol = 0;
  this.fechaDescubrimiento = new Date("0001-01-01");

  // método para mostrar info consola
  this.muestraInformacio = function () {
    console.table(this);
  };
}

// declaracion planetas
let mercurio, venus, tierra, marte, jupiter, saturno, urano, neptuno;

// array de planetas
let planetas = [
  mercurio = ["Mercurio", 60827208742, 2037560, 8, "Conocido desde la antiguedad"],
  venus = ["Venus", 928415345893, 1450987, 7, "Conocido desde la antiguedad"],
  tierra = ["La Tierra", 1083206916846, 1037850111, 1, "Conocido desde la antiguedad"],
  marte = ["Marte", 163115609799, 102577777, 5, "Conocido desde la antiguedad"],
  jupiter = ["Jupiter", 1431281810739360, 90000000, 4, "Conocido desde la antiguedad"],
  saturno = ["Saturno", 827129915150897, 67987229, 3, "Conocido desde la antiguedad"],
  urano = ["Urano", 68334355695584, 780896292, 2, "Conocido desde la antiguedad"],
  neptuno = ["Neptuno", 62525703987412, 4673829, 6, "Conocido desde la antiguedad"]
];

// arrayd de objetos "Planeta"
let objetosPlanetas = [];

// creacion planetas bucle
planetas.forEach(e => {
  let planeta = new Planeta();
  for (let j = 0; j < 4; j++) {
    planeta.nombre = e[0];
    planeta.volumen = e[1];
    planeta.vecesTamanyoSol = e[2];
    planeta.distanciaSol = e[3]
    planeta.fechaDescubrimiento = e[4];
  }
  objetosPlanetas.push(planeta);
});

// info de todos los planetas
console.log("Información de los Planetas:");
objetosPlanetas.forEach(e => {
  e.muestraInformacio();
});

/*
  Mostra los planetas por pantalla (ordenados por distancia al sol)
*/

console.log("Planetas ordenador por 'distancia al Sol' (menos a mayor): ");
console.table(objetosPlanetas.sort(((a, b) => a.distanciaSol - b.distanciaSol)));

