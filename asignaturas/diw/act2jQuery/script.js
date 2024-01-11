// definimos las variables globales
let cards = [
  {
    name: "aquaman",
    img: "aquaman.png",
  },
  {
    name: "batman",
    img: "batman.jpg",
  },
  {
    name: "captain america",
    img: "captain-america.jpg",
  },
  {
    name: "fantastic four",
    img: "fantastic-four.jpg",
  },
  {
    name: "flash",
    img: "flash.jpg",
  },
  {
    name: "green arrow",
    img: "green-arrow.jpg",
  },
  {
    name: "green lantern",
    img: "green-lantern.jpg",
  },
  {
    name: "ironman",
    img: "ironman.png",
  },
  {
    name: "spiderman",
    img: "spiderman.png",
  },
  {
    name: "superman",
    img: "superman.jpg",
  },
  {
    name: "the avengers",
    img: "the-avengers.jpg",
  },
  {
    name: "thor",
    img: "thor.png",
  },
];

// imprimir el juego en el DOM
$("document").ready(() => {
  // variable para guardar el par de cartas seleccionadas
  let selectedCards = [2];

  cards = shuffle(cards);
  cards = cortarArray(cards);

  // creamos una copia del array sin afectar la original con .slice()
  let copyCards = cards.slice();

  // mezclamos la copia
  copyCards = shuffle(copyCards);

  // unimos los dos arrays
  cards = cards.concat(copyCards);

  $("body").append("<h2>Memory game - Sidney Silva</h2>");
  $("body").append("<button id='start'>Start</button>");
  $("body").append("<button id='reset'>Reset</button>");
  $("body").append("<div id='game'></div>");

  cards.forEach((card) => {
    $("#game").append(
      `<div class="card" guessed="false" fliped="false" data-card-name="${card.name}"><div class="back" name="${card.img}"></div><div class="front" style="background: url('img/${card.img}') no-repeat center center; background-size: cover"></div></div>`
    );
  });

  // hacer que cuando haga click en la carta se muestre la imagen
  $(".back").on("click", function () {
    // cambiamos el estado de la carta a true
    $(this).parent().attr("fliped", "true");

    // ponemos un display none a la carta
    $(this).css("display", "none");
    // le quitamos el display none a la carta de delante
    $(this).next().css("display", "block");

    // guardamos las cartas con fliped true en la variable
    selectedCards = $(`div[fliped="true"]`).map(function () {
      return $(this).attr("data-card-name");
    });

    // mostramos las cartas seleccionadas
    console.log(selectedCards);

    // si la variable tiene dos cartas
    if (selectedCards.length === 2) {
      // comprobamos si las cartas son iguales
      if (selectedCards[0] == selectedCards[1]) {
        // si son iguales las dejamos boca arriba

        // obtenemos el data-card-name de la carta seleccionada
        let cardName = $(this).parent().attr("data-card-name");

        // seleccionamos las cartas con el mismo data-card-name
        $(`div[data-card-name="${cardName}"][fliped="true"]`).css(
          "display",
          "block"
        );

        // cambiamos el estado guessed a true
        $(`div[data-card-name="${cardName}"][fliped="true"]`).attr(
          "guessed",
          "true"
        );

        // cambiamos el estado fliped a false
        $(`div[data-card-name="${cardName}"][fliped="true"]`).attr(
          "fliped",
          "false"
        );

        // borramos las cartas de la variable
        selectedCards = [];
      } else {
        // si no son iguales las volvemos a poner boca abajo

        // obtenemos el data-card-name de las dos cartas seleccionadas
        let cardName1 = selectedCards[0];
        let cardName2 = selectedCards[1];

        // seleccionamos las cartas con el mismo data-card-name
        let card1 = $(`div[data-card-name="${cardName1}"][fliped="true"]`);
        let card2 = $(`div[data-card-name="${cardName2}"][fliped="true"]`);

        console.log(card1);
        console.log(card2);

        let children1 = $(card1).children();

        let children2 = $(card2).children();

        children1[0].style.display = "block";
        children1[1].style.display = "none";

        children2[0].style.display = "block";
        children2[1].style.display = "none";

        // cambiamos el estado fliped a false
        card1.attr("fliped", "false");
        card2.attr("fliped", "false");

        // borramos las cartas de la variable
        selectedCards = [];
      }
    }
  });
});

console.log("Hola Mundo!");

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // Mientras queden elementos para mezclar...
  while (0 !== currentIndex) {
    // Seleccionar un elemento sin mezclar...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // E intercambiarlo con el elemento actual
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

// función para cortar la array
function cortarArray(array) {
  let longitudRandom = Math.floor(Math.random() * (array.length - 6) + 6);

  let arrayCortado = array.slice(0, longitudRandom);
  return arrayCortado;
}
