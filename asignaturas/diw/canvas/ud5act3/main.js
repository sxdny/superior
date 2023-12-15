// Obtener el canvas y el contexto
var canvas = document.getElementById("ping-pong");
var context = canvas.getContext("2d");
var parar = document.getElementById("parar");

// Definir las variables del juego
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;

// Función para dibujar la pelota
function drawBall() {
    context.beginPath();
    context.arc(x, y, 10, 0, Math.PI * 2);
    context.fillStyle = "#0095DD";
    context.fill();
    context.closePath();
}

// Función principal del juego
function draw() {
    // Limpiar el canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar la pelota
    drawBall();

    // Actualizar la posición de la pelota
    x += dx;
    y += dy;

    // Rebotar la pelota en los bordes del canvas
    if (x + dx > canvas.width - 10 || x + dx < 10) {
        dx = -dx;
    }
    if (y + dy > canvas.height - 10 || y + dy < 10) {
        dy = -dy;
    }
}

parar.addEventListener("click", function () {
    canvas.style.backgroundColor = "lightblue";
    // parar el juego
    velocidad = 0;
    clearInterval(intervalId);

    // cambiar el texto del botón
    parar.innerHTML = "Reanudar";

    // mostrar el botón de reanudar
    reanudar.style.display = "block";

    // ocultar el botón de parar
    parar.style.display = "none";
});

// botón para reanudar el juego
reanudar.addEventListener("click", function () {
    canvas.style.backgroundColor = "#222";
    intervalId = setInterval(draw, velocidad);

    // cambiar el texto del botón
    parar.innerHTML = "Parar";

    // mostrar el botón de parar
    parar.style.display = "block";

    // ocultar el botón de reanudar
    reanudar.style.display = "none";
});

reanudar.style.display = "none";

let speedXInput = document.getElementById("speedX");
let speedYInput = document.getElementById("speedY");

speedXInput.addEventListener("input", function () {
    // para evitar que el juego se rompa
    if (speedXInput.value === "") {
        speedXInput.value = 0;
    }
    if (speedXInput.value > 10) {
        speedXInput.value = 10;
    }
    dx = parseFloat(speedXInput.value);
});

speedYInput.addEventListener("input", function () {
    // para evitar que el juego se rompa
    if (speedYInput.value === "") {
        speedYInput.value = 0;
    }
    if (speedYInput.value > 10) {
        speedYInput.value = 10;
    }
    dy = parseFloat(speedYInput.value);
});

let intervalId;
let velocidad = 10;

window.onload = (velocidad) => {
    intervalId = setInterval(draw, velocidad);
}


