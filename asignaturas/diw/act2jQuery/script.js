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

// Iniciamos el juego
$("document").ready(() => {
  $("body").append("<h2>Comic Characters Memory game</h2>");
  $("body").append("<p>by Sidney Silva</p>");
  $("body").append(
    "<div id='buttons'><button id='start'>Start Game</button><button id='reset'>Reset</button></div>"
  );

  $("body").append("<div id='message'><p>Hola me llamo Paco</p></div>");

  $("#reset").on("click", () => {
    $("#game").empty();
    iniciarJuego();
  });

  $("#start").on("click", () => {
    iniciarJuego();
    $("#start").prop("disabled", true);
    $("#start").addClass("disabled");
  });

  $("#reset").prop("disabled", true);
  $("#reset").addClass("disabled");

  $("body").append("<div id='game'></div>");
});


function iniciarJuego() {
  
  if ($("#reset").prop("disabled") == true) {
    $("#reset").prop("disabled", false);
    $("#reset").removeClass("disabled");
  }

  cards = shuffle(cards);
  cards = cortarArray(cards);

  let copyCards = cards.slice();
  copyCards = shuffle(copyCards);

  cards = cards.concat(copyCards);

  cards.forEach((card) => {
    $("#game").append(
      `<div class="card" guessed="false" fliped="false" data-card-name="${card.name}"><div class="back" name="${card.img}"></div><div class="front" style="background: url('img/${card.img}') no-repeat center center; background-size: cover"></div></div>`
    );
  });

  $(".back").on("click", comprobarCartas);
}

function comprobarGanador() {
  
  let cards = $(".card");

  cards.each(function () {
    if ($(this).attr("guessed") == "false") {
      return;
    } else {
      alert("Has ganado!");
    }
  });
}

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

function cortarArray(array) {
  let longitudRandom = Math.floor(Math.random() * (array.length - 6) + 6);

  let arrayCortado = array.slice(0, longitudRandom);
  return arrayCortado;
}

function comprobarCartas() {

  $(this).addClass("rotate");
  $(this).parent().attr("fliped", "true");

  // para que se vea la animación
  setTimeout(() => {
    $(this).css("display", "none");
    $(this).next().css("display", "block");
    $(this).removeClass("rotate");
  }, 460);

  selectedCards = $(`div[fliped="true"]`).map(function () {
    return $(this).attr("data-card-name");
  });

  if (selectedCards.length === 2) {
    
    $(".back").off("click");

    // para el factor sorpresa
    setTimeout(() => {
      if (selectedCards[0] == selectedCards[1]) {
        let cardName = $(this).parent().attr("data-card-name");

        $(`div[data-card-name="${cardName}"][fliped="true"]`).css(
          "display",
          "block"
        );

        $(`div[data-card-name="${cardName}"][fliped="true"]`).attr(
          "guessed",
          "true"
        );

        $(`div[data-card-name="${cardName}"][fliped="true"]`).attr(
          "fliped",
          "false"
        );

        selectedCards = [];

        $("#message").html("<p>Has acertado!</p>");
        $("#message").css("background-color", "#4CAF50");
        $("#message").css("border-color", "#69ff3c");
        $("#message").css("color", "#69ff3c");
        $("#message").addClass("show-up");

        // después de 2.5s, le quitamos la clase show-up
        setTimeout(() => {
          $("#message").removeClass("show-up");
        }, 2500);

        // revertimos la animación
        $(this).removeClass("rotate");
      } else {
    
        $("#message").html("<p>Has fallado!</p>");
        $("#message").css("background-color", "#f44336");
        $("#message").css("border-color", "#ff3c3c");
        $("#message").css("color", "#ff3c3c");
        $("#message").addClass("show-up");

        // después de 2.5s, le quitamos la clase show-up
        setTimeout(() => {
          $("#message").removeClass("show-up");
        }, 2500);

        // obtenemos el data-card-name de las dos cartas seleccionadas
        let cardName1 = selectedCards[0];
        let cardName2 = selectedCards[1];

        // seleccionamos las cartas con el mismo data-card-name
        let card1 = $(`div[data-card-name="${cardName1}"][fliped="true"]`);
        let card2 = $(`div[data-card-name="${cardName2}"][fliped="true"]`);

        // seleccionamos los hijos de las cartas para poder rotarlos
        let children1 = $(card1).children();
        let children2 = $(card2).children();

        children1.addClass("rotate2");
        children2.addClass("rotate2");

        // para que se vea la animación
        setTimeout(() => {
          children1[0].style.display = "block";
          children1[1].style.display = "none";

          children2[0].style.display = "block";
          children2[1].style.display = "none";

          children1.removeClass("rotate2");
          children2.removeClass("rotate2");
        }, 200);

        card1.attr("fliped", "false");
        card2.attr("fliped", "false");

        selectedCards = [];
      }

      comprobarJuegoTerminado();
    }, 1000);

    $(".back").on("click", comprobarCartas);

  }
}

function comprobarJuegoTerminado() {
  let trues = 0;
  let cards = $(".card");

  cards.each(function () {

    if ($(this).attr("guessed") == "true") {
      trues++;
    }
    if (trues == cards.length) {
      $("#message").html("<p>Has ganado!</p>");
      $("#message").css("background-color", "gold");
      $("#message").css("border-color", "#lightgoldenrodyellow");
      $("#message").css("color", "#lightgoldenrodyellow");
      $("#message").addClass("show-up");

      // después de 2.5s, le quitamos la clase show-up
      setTimeout(() => {
        $("#message").removeClass("show-up");
      }, 2500);

      $("#start").prop("disabled", false);
      $("#start").removeClass("disabled");

      $("#reset").prop("disabled", true);
      $("#reset").addClass("disabled");

      $("#game").empty();
    }

  });
}
