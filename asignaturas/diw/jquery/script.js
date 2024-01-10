// Actividad 1 - UD6 - Sidney Silva Braz de Oliveira

// capturamos los valores
// val obtiene el valor de los elementos del formulario
let n1 = $("input[name='n1']").val();
let n2 = $("input[name='n2']").val();

// añadimos el evento click al boton
$("#sumar").on("click", () => {
  // capturamos los valores
  let n1 = parseInt($("input[name='n1']").val());
  let n2 = parseInt($("input[name='n2']").val());

  // comprobar que los valores no están vacios
  if (isNaN(n1) || isNaN(n2)) {
    $("#resultado").css("color", "red");
    $("#resultado").html("¡Introduce valores numéricos en ambos campos!");
    return;
  } else {
      let resultado = n1 + n2;
        $("#resultado").css("color", "black");
    $("#resultado").html("Resultado:" + resultado);
  }
});
